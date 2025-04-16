i have used chatgpt for making this project .i have set bidirectional flow of info

# ClickHouse & Flat File Data Ingestion Tool

This web application allows bidirectional data ingestion between a **ClickHouse** database and a **Flat File (CSV)** format. It supports column selection, schema preview, JWT-based authentication, and displays ingestion results.

## 🚀 Features

- 🔄 Bidirectional ingestion:
  - ClickHouse ➡️ Flat File
  - Flat File ➡️ ClickHouse
- 🧾 Select columns to ingest
- 🔐 JWT token-based authentication (ClickHouse)
- 🧠 Schema discovery (ClickHouse or Flat File)
- 📊 Record count reporting
- ❌ Error handling with user-friendly messages

## 🧱 Tech Stack

- **Frontend:** React.js
- **Backend:** Node.js + Express
- **Database:** ClickHouse
- **Client Library:** [`@clickhouse/client`](https://github.com/ClickHouse/clickhouse-js)

---

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/12347manish/ClickHouse.git
cd ClickHouse


**flow::**
ClickHouse/
├── backend/                 # Express API
│   └── routes/
│   └── services/
├── frontend/                # React frontend
│   └── components/
│   └── pages/
├── .env
├── README.md
├── prompts.txt              # (If using AI tools)

Madeby: Manish Thakur
