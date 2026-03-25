# 🌾 AgriChain – Decentralized Agricultural Supply Chain (Web3 Powered)

![AgriChain](https://img.shields.io/badge/Blockchain-Avalanche-red?style=for-the-badge&logo=avalanche)
![React](https://img.shields.io/badge/Frontend-React_+_Vite-blue?style=for-the-badge&logo=react)
![Solidity](https://img.shields.io/badge/Contracts-Solidity_0.8.x-black?style=for-the-badge&logo=ethereum)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)
![Deployed](https://img.shields.io/badge/Deployed-Vercel-black?style=for-the-badge&logo=vercel)

---

## 👥 Team

| Name | Email |
|---|---|
| **Veer Kalp Manish** | 📧 kalpveer2@gmail.com |
| **Aaryamaan Champaneria** | 📧 aaryamaannc15@gmail.com |
| **Shreya Jadhav** | 📧 shreya09.academic@gmail.com |

---

## 📌 Overview

**AgriChain** is a blockchain-powered agricultural supply chain platform designed to ensure **transparency, traceability, and trust** across the entire lifecycle of agricultural products.

It leverages **Smart Contracts (Solidity)**, **IPFS**, and modern **Web3 tooling** to create a secure, decentralized, and tamper-proof ecosystem.

Built with a modern stack including **React, Vite, Tailwind CSS, Core Wallet**, and **Vercel**, AgriChain delivers a scalable and developer-friendly architecture.

---

## 🎯 Key Objectives

- ✅ End-to-end product traceability
- ✅ Fraud prevention and tamper-proof data
- ✅ Transparent pricing & quality verification
- ✅ Stakeholder accountability
- ✅ Sustainability tracking (carbon footprint, organic practices)

---

## 🏗️ System Architecture

```
Frontend (React + Core Wallet)
        ↓
ProductManager (Smart Contract Logic)
        ↓
StakeholderManager (Access Control)
        ↓
DataStructures (Shared Models)
        ↓
IPFS (Off-chain Storage)
```

---

## ⚙️ Smart Contracts

### 📦 1. DataStructures (Library)

Defines core data models:

**Enums**
- `ProductStage`
- `QualityGrade`
- `CertificationType`

**Structs**
- `Product`, `Transaction`, `Quality`, `Price`, `FarmingPractices`

> Acts as the **schema layer** of the protocol.

---

### 👥 2. StakeholderManager

Handles:
- Farmer / Distributor / Retailer / Inspector registration
- Role-based access control
- Verification system
- Reputation scoring (0–100)

**Security Features:**
- Prevents unauthorized participation
- Enforces trust via reputation thresholds

---

### 🌾 3. ProductManager (Core Contract)

Handles complete lifecycle:
- Product creation (batch-based)
- Lifecycle updates: `Planted → Harvested → Distributed → Sold`
- Ownership transfers
- Dynamic pricing
- Quality inspection (linked to IPFS)
- Batch operations (gas optimized)

---

### 📢 4. Events Interface

Tracks:
- Product lifecycle changes
- Ownership transfers
- Stakeholder actions
- Certifications

> Enables **event-driven frontend updates** in real-time.

---

### 🪙 5. AgriCoin (Custom ERC-20 Token)

- **Contract Address (Fuji Testnet):** `0x6A2d744D6505Cd3Fb84455aE9d8d142f1531a6b7`
- **Symbol:** `AGRI`
- **Decimals:** 16 (ultra-high precision for commodity tracking)
- **Minting:** Restricted to owner — triggered from the Farmer Dashboard

---

## 🧪 Testing

- **Framework:** Foundry
- Simulates: Multi-role interactions, product lifecycle, transfers & validations

---

## 🔐 Security Features

- AccessControl (OpenZeppelin)
- ReentrancyGuard
- Pausable contracts
- Custom errors (gas optimized)
- Strict input validation

---

## 📦 Storage Optimization

- Packed variables (`uint128`, `uint64`)
- Batch processing
- Efficient mappings: `productsByOwner`, `productByCategory`

---

## 🔗 IPFS Integration

Used for storing:
- Product metadata & images
- Quality reports
- Location data

**Why IPFS?**
- Low gas cost
- Immutable (CID-based)
- Decentralized

---

## 🔄 Product Lifecycle Flow

```
1. Farmer registers → creates product batch
2. Product enters "Planted" stage
3. Inspector records quality → stored on IPFS
4. Product transferred to Distributor
5. Distributor → Retailer
6. Retailer marks as "Sold"
```

> Every step is **recorded on-chain**, permanently and immutably.

---

## 📊 Key Features

| Feature | Status |
|---|---|
| Full Traceability | ✅ |
| Immutable History | ✅ |
| Transparent Quality Grading | ✅ |
| Dynamic Pricing | ✅ |
| Role-Based Access | ✅ |
| Sustainability Tracking | ✅ |
| Gas-Efficient Operations | ✅ |
| AGRI Token Minting | ✅ |

---

## 🛠️ Tech Stack

### 🔗 Blockchain
- Solidity `^0.8.x`
- EVM (Ethereum Virtual Machine)
- **Avalanche Fuji C-Chain** (Testnet)

### 💻 Frontend
- React.js + Vite
- Tailwind CSS
- Framer Motion (animations)
- Ethers.js (Web3 bridge)

### 🔐 Wallet & Web3
- Core Wallet (Avalanche ecosystem)
- Ethers.js / Viem

### ⚙️ Smart Contract Dev
- Foundry
- OpenZeppelin Contracts

### 🌐 Storage
- IPFS (off-chain data)

### 🚀 Deployment
- Vercel (Frontend)
- GitHub (Version Control)

### 🤖 AI Assistance
- Antigravity (AI Coding Support)

---

## 🚀 Getting Started

```bash
# Clone the repository
git clone https://github.com/kalpveer/Avalanche_Project_KSA.git

# Navigate to frontend
cd agrichain-main

# Install dependencies
npm install

# Start development server (runs on http://localhost:4028)
npm start
```

### Environment Variables

Create a `.env` file in `agrichain-main/` and add:

```env
VITE_CONTRACT_ADDRESS=0x6A2d744D6505Cd3Fb84455aE9d8d142f1531a6b7
VITE_FUJI_RPC=https://api.avax-test.network/ext/bc/C/rpc
```

---

## 🚀 Future Enhancements

- 📱 QR-based product tracking (mobile app)
- 🤖 AI-based quality prediction
- 📡 IoT sensor integration
- 🏛️ Government certification APIs
- 🌐 Cross-chain support (Ethereum ↔ Avalanche)
- 🌍 Multi-language Consumer Portal

---

## 📌 Conclusion

**AgriChain** combines blockchain, decentralized storage, and modern frontend technologies to build a **trust-first agricultural ecosystem**.

It empowers:
- 🌾 **Farmers** → Fair visibility & direct market access
- 🚚 **Distributors** → Reliable, verified supply data
- 🛒 **Consumers** → Full transparency from field to shelf

---

*Built with ❤️ on Avalanche*
