let handler = async (m, { conn }) => {
    const react = async (text) => {
        try { await conn.sendMessage(m.chat, { react: { text: text, key: m.key } }) } catch {}
    }

    try {
        await react('🔗')
        let link = await conn.groupInviteCode(m.chat)
        let groupMetadata = await conn.groupMetadata(m.chat)

        let texto = `🍓 𓆩 𝗦𝗧𝗥𝗔𝗪𝗕𝗘𝗥𝗥𝗬 𝗕𝗢𝗧 𓆪 🍓
𐔌 ꒱ ***LINK DEL GRUPO*** 𐔌 ꒱ ✅

.⃟𖥔 ݁. 𖦹˙— \`\`INVITACIÓN\`\` —˙𖦹.🔗꒷

── *📊 INFORMACIÓN* ╏
👥 ➛ Grupo: *${groupMetadata.subject}* pe

── *🔗 ENLACE* ╏
https://chat.whatsapp.com/${link}

── *📝 NOTAS* ╏
🔒 ➛ Solo admins pueden resetear el link
⚠️ ➛ No lo compartas con desconocidos pe

━━━━━━━━━━━`

        await conn.sendMessage(m.chat, { text: texto }, { quoted: m })
    } catch (e) {
        await react('❌')
        let error = `🍓 𓆩 𝗦𝗧𝗥𝗔𝗪𝗕𝗘𝗥𝗥𝗬 𝗕𝗢𝗧 𓆪 🍓
𐔌 ꒱ ***LINK DEL GRUPO*** 𐔌 ꒱ ⚠️

.⃟𖥔 ݁. 𖦹˙— \`\`ERROR\`\` —˙𖦹.❌꒷

── *📝 AVISO* ╏
❌ ➛ No pude obtener el link pe
🔒 ➛ ¿Soy admin del grupo?

━━━━━━━━━━━`
        conn.sendMessage(m.chat, { text: error }, { quoted: m })
    }
}

handler.help = ['link']
handler.tags = ['grupos']
handler.command = ['link', 'linkgroup', 'grouplink']
handler.group = true
handler.admin = true

export default handler