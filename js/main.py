import telebot
import random
import time

API_TOKEN = "7618123387:AAFFzS7yjPnDFMxvAr8e2AXtScI8nMPeEt8"
bot = telebot.TeleBot(API_TOKEN)

# Lista de alertas
alertItems = [
    { "tipo": "Inundação - Alta", "descricao": "Risco de inundação devido a chuvas intensas", "local": "Vale do Taquari", "hora": "2024-10-26 14:30" },
    { "tipo": "Deslizamento - Média", "descricao": "Risco de deslizamentos em áreas íngremes", "local": "Serra Gaúcha", "hora": "2024-10-26 14:15" },
    { "tipo": "Tempestade - Alta", "descricao": "Chuva forte acompanhada de ventos de até 100 km/h", "local": "Caxias do Sul", "hora": "2024-10-26 13:45" },
    { "tipo": "Enchente - Baixa", "descricao": "Nível do rio subindo lentamente, sem risco imediato", "local": "Santa Maria", "hora": "2024-10-26 13:00" },
    { "tipo": "Granizo - Média", "descricao": "Previsão de granizo em áreas isoladas", "local": "Porto Alegre", "hora": "2024-10-26 12:30" },
    { "tipo": "Calor Extremo - Alta", "descricao": "Temperatura acima de 40°C prevista para amanhã", "local": "Passo Fundo", "hora": "2024-10-25 17:00" },
    { "tipo": "Nevoeiro - Baixa", "descricao": "Visibilidade reduzida devido a nevoeiro denso", "local": "Gramado", "hora": "2024-10-26 06:00" },
    { "tipo": "Ventos Fortes - Alta", "descricao": "Rajadas de vento superiores a 80 km/h", "local": "Canela", "hora": "2024-10-26 11:30" },
    { "tipo": "Alagamento - Média", "descricao": "Acúmulo de água em áreas baixas devido a chuvas contínuas", "local": "Pelotas", "hora": "2024-10-26 15:00" },
    { "tipo": "Baixa Umidade - Alta", "descricao": "Umidade do ar abaixo de 20%, condições propícias para incêndios", "local": "Uruguaiana", "hora": "2024-10-26 10:00" },
    { "tipo": "Frente Fria - Média", "descricao": "Queda significativa de temperatura com ventos gelados", "local": "Lajeado", "hora": "2024-10-26 09:00" },
    { "tipo": "Gelo na Pista - Alta", "descricao": "Possibilidade de gelo nas estradas em áreas montanhosas", "local": "Nova Petrópolis", "hora": "2024-10-26 05:30" },
    { "tipo": "Chuvas Torrenciais - Alta", "descricao": "Previsão de chuvas intensas nas próximas horas", "local": "Bento Gonçalves", "hora": "2024-10-26 16:45" },
    { "tipo": "Incêndio Florestal - Alta", "descricao": "Incêndio florestal ativo, fumaça densa e áreas evacuadas", "local": "Erechim", "hora": "2024-10-26 14:00" },
    { "tipo": "Ondas de Calor - Alta", "descricao": "Temperaturas extremas acima de 42°C", "local": "Santa Rosa", "hora": "2024-10-25 14:30" }
]

def enviar_alerta(chat_id):
    alerta = random.choice(alertItems)
    mensagem = f"{alerta['tipo']}\n\n{alerta['descricao']}\n\n📍 {alerta['local']} • 🕒 {alerta['hora']}"
    bot.send_message(chat_id, mensagem)

# Comando inicial para o bot
@bot.message_handler(commands=["risco"])
def start(message):
    bot.reply_to(message, "Olá, bem-vindo(a)! Vou enviar um alerta aleatório sobre condições de risco.")
    chat_id = message.chat.id
    enviar_alerta(chat_id)  # Envia um único alerta aleatório

# Boas-vindas automáticas para novos membros do grupo
@bot.message_handler(content_types=["new_chat_members"])
def welcome_new_member(message):
    for new_member in message.new_chat_members:
        bot.send_message(
            message.chat.id,
            f"Olá, {new_member.first_name}! Bem-vindo(a) ao grupo! "
            "Eu sou um bot de monitoramento e envio alertas sobre condições de risco, como enchentes e deslizamentos. "
            "Digite /risco para receber um alerta."
        )

bot.infinity_polling()
