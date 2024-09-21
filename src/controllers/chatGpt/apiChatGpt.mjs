import { connectToDatabase } from "../../DB/db.mjs";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();
const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const apiChatGPT = async (req, res) => {
  let connection;
  try {
    const { query_human } = req.body;

    if (!query_human) {
      return res.status(400).json({ error: 'Campo vacío' });
    }

    const human_query_sql = async (query_human) => {
      try {

        const shemaDatabase = `
DROP TABLE IF EXISTS brand;
CREATE TABLE IF NOT EXISTS brand (
id int NOT NULL AUTO_INCREMENT,
name varchar(255) NOT NULL,
PRIMARY KEY (id)
) ENGINE=MyISAM AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS cart;
CREATE TABLE IF NOT EXISTS cart (
id int NOT NULL AUTO_INCREMENT,
user_id int NOT NULL,
created_at date DEFAULT NULL,
PRIMARY KEY (id),
KEY user_id (user_id)
) ENGINE=MyISAM AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS cart_item;
CREATE TABLE IF NOT EXISTS cart_item (
id int NOT NULL AUTO_INCREMENT,
cart_id int NOT NULL,
product_id int NOT NULL,
quantity int NOT NULL,
PRIMARY KEY (id),
KEY cart_id (cart_id),
KEY product_id (product_id)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS category;
CREATE TABLE IF NOT EXISTS category (
id int NOT NULL AUTO_INCREMENT,
name varchar(255) NOT NULL,
PRIMARY KEY (id)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS image;
CREATE TABLE IF NOT EXISTS image (
id int NOT NULL AUTO_INCREMENT,
product_id int NOT NULL,
file_path varchar(255) NOT NULL,
PRIMARY KEY (id),
KEY product_id (product_id)
) ENGINE=MyISAM AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS product;
CREATE TABLE IF NOT EXISTS product (
id int NOT NULL AUTO_INCREMENT,
name varchar(255) NOT NULL,
description text,
price int NOT NULL,
model varchar(255) DEFAULT NULL,
stock int NOT NULL,
brand_id int DEFAULT NULL,
category_id int DEFAULT NULL,
PRIMARY KEY (id),
KEY brand_id (brand_id),
KEY category_id (category_id)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS sales;
CREATE TABLE IF NOT EXISTS sales (
id int NOT NULL AUTO_INCREMENT,
user_id int NOT NULL,
sale_date datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
total decimal(10,2) NOT NULL,
status enum(pending,paid,cancelled,deliver) DEFAULT pending,
session_id varchar(191) NOT NULL,
PRIMARY KEY (id),
UNIQUE KEY session_id (session_id),
KEY user_id (user_id)
) ENGINE=MyISAM AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS sales_items;
CREATE TABLE IF NOT EXISTS sales_items (
id int NOT NULL AUTO_INCREMENT,
sale_id int DEFAULT NULL,
product_id int DEFAULT NULL,
name varchar(255) DEFAULT NULL,
price decimal(10,2) DEFAULT NULL,
quantity int DEFAULT NULL,
PRIMARY KEY (id),
KEY sale_id (sale_id)
) ENGINE=MyISAM AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

DROP TABLE IF EXISTS users;
CREATE TABLE IF NOT EXISTS users (
id int NOT NULL AUTO_INCREMENT,
username varchar(255) NOT NULL,
phone bigint NOT NULL,
adress varchar(100) NOT NULL,
password varchar(255) NOT NULL,
email varchar(255) NOT NULL,
PRIMARY KEY (id)
) ENGINE=MyISAM AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
`;

        const consultationChatGPT = `
        Dado el siguiente esquema de base de datos, crea una consulta SQL para obtener la información solicitada. 
        Retorna la consulta en formato JSON. 
        <ejemplo>
        {
          "query_sql": "SELECT * FROM users WHERE name = 'Juan Manuel Sanchez';",
          "original_query": "Búscame toda la información del usuario Juan Manuel Sanchez."
        }
        </ejemplo>

        <esquema>
        ${shemaDatabase}
        </esquema>
        `;

        const response = await client.chat.completions.create({
          model: 'gpt-3.5-turbo', // Asegúrate de que el modelo esté dentro de los límites gratuitos
          messages: [
            { role: 'system', content: consultationChatGPT },
            { role: 'user', content: query_human }
          ],
          max_tokens: 400,
        });

        return response.choices[0].message.content;
      } catch (error) {
        console.error(`Error al enviar la solicitud a la API de ChatGPT: ${error.message}`);
        return null;  // Asegura que retorne null en caso de error
      }
    };

    const sqlQuery = await human_query_sql(query_human);

    if (!sqlQuery) {
      return res.status(400).json({ error: 'La consulta generada por la API de ChatGPT no es válida.' });
    }

    // Intenta convertir la respuesta en JSON
    let parsedQuery;
    try {
      parsedQuery = JSON.parse(sqlQuery);
    } catch (parseError) {
      return res.status(500).json({ error: 'Error al interpretar la respuesta de ChatGPT.' });
    }


    const querySql = parsedQuery.query_sql;
    if (!querySql) {
      return res.status(400).json({ error: 'La consulta SQL generada es inválida o está vacía.' });
    }

    // Conectar a la base de datos y ejecutar la consulta
    connection = await connectToDatabase(); // Asumiendo que tienes una función para conectarte

    const [result] = await connection.query(querySql);
    res.status(200).json({ data: result });

  } catch (error) {
    console.error(`Error al procesar la solicitud: ${error.message}`);
    res.status(500).json({ error: 'Error al procesar la solicitud.' });
  } finally {
    if (connection) {
      connection.end();
    }
  }
};


