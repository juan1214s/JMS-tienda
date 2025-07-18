import { connectToDatabase } from "../../DB/db.mjs";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const schemaDescription = `
Tablas disponibles:

- users (id, username, phone, address, email)
- product (id, name, description, price, stock, brand_id, category_id)
- sales (id, user_id, sale_date, total, status, session_id)
- sales_items (id, sale_id, product_id, name, price, quantity)
- cart (id, user_id, created_at)
- cart_item (id, cart_id, product_id, quantity)

Relaciones:
- sales → users (user_id)
- cart → users (user_id)
- cart_item → cart (cart_id)
- sales_items → sales (sale_id)
- sales_items → product (product_id)
- product → category, brand
`;

export const apiChatGPT = async (req, res) => {
  let connection;
  try {
    const { user_id } = req.params;
    const { query_human } = req.body;

    if (!query_human || !user_id) {
      return res.status(400).json({ error: "Faltan datos: query_human o user_id" });
    }

    const sqlPrompt = `
Eres un asistente experto en SQL.

Dado el siguiente esquema:

${schemaDescription}

Y el ID de usuario: ${user_id}

Tu tarea es generar una consulta SQL en formato JSON, que siempre incluya el filtro de user_id si aplica, basada en la pregunta del usuario.

Pregunta del usuario:
"${query_human}"

Solo responde en este formato:

{
  "query_sql": "AQUÍ VA LA CONSULTA",
  "original_query": "${query_human}"
}

Importante:
- NO uses DELETE, UPDATE, DROP.
- Solo SELECT.
- Si la pregunta menciona carrito, consultar cart, cart_item y product.
- Si la pregunta menciona compras o ventas, consultar sales, sales_items y product.
`;

    const sqlResponse = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", content: sqlPrompt }],
      max_tokens: 600,
    });

    const sqlJson = sqlResponse.choices[0]?.message?.content;
    const { query_sql } = JSON.parse(sqlJson);

    connection = await connectToDatabase();
    const [result] = await connection.query(query_sql);

    const explanationPrompt = `
Pregunta original del usuario:
"${query_human}"

Consulta SQL generada:
${query_sql}

Resultado obtenido:
${JSON.stringify(result)}

Explica el resultado para que una persona sin conocimientos técnicos lo entienda, usando español claro, sin mencionar tablas ni SQL y en texto bien organizado no en formato json.
`;

    const explanationResponse = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "system", content: explanationPrompt }],
      max_tokens: 500,
    });

    const explanation = explanationResponse.choices[0]?.message?.content;

    res.status(200).json({
      result,
    });

  } catch (error) {
    console.error("Error apiChatGPT:", error.message);
    res.status(500).json({ error: "Error interno." });
  } finally {
    if (connection) connection.end();
  }
};
