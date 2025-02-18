export type TokenAirdropDapp = {
    "version": "0.1.0",
    "name": "token_airdrop_dapp",
    "address": "5f9SViZQr76U5V7sHpzBRrBEJ6ypjd4gfQWPdM2Rta7T",
    "metadata": {
      "name": "token_airdrop_dapp",
      "version": "0.1.0",
      "spec": "0.1.0",
      "description": "Claim your airdrop"
    },
    "instructions": [
      {
        "name": "initializeAirdrop",
        "accounts": [
          {
            "name": "tokenAtaForProgram",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "data",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "tokenMint",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "tokenAtaForAdmin",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "admin",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "tokenProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "rent",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "airdropAmount",
            "type": "u64"
          }
        ]
      },
      {
        "name": "depositTokens",
        "accounts": [
          {
            "name": "tokenAtaForProgram",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "data",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "tokenMint",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "tokenAtaForAdmin",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "admin",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "tokenProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      },
      {
        "name": "claimAirdrop",
        "accounts": [
          {
            "name": "tokenAtaForProgram",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "data",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "tokenMint",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "tokenAtaForUser",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "user",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "admin",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "tokenProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "tokenAtaForProgramBump",
            "type": "u8"
          }
        ]
      }
    ],
    "accounts": [
      {
        "name": "data",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "admin",
              "type": "publicKey"
            },
            {
              "name": "totalTokens",
              "type": "u64"
            },
            {
              "name": "tokensDistributed",
              "type": "u64"
            },
            {
              "name": "claimedAddresses",
              "type": {
                "vec": "publicKey"
              }
            }
          ]
        }
      }
    ],
    "errors": [
      {
        "code": 6000,
        "name": "Overflow",
        "msg": "Arithmetic Overflow"
      },
      {
        "code": 6001,
        "name": "InvalidAdmin",
        "msg": "Invalid Admin"
      },
      {
        "code": 6002,
        "name": "AlreadyClaimed",
        "msg": "Already claimed airdrop"
      },
      {
        "code": 6003,
        "name": "InsufficientTokens",
        "msg": "Insufficient tokens"
      }
    ]
  };
  
  export const IDL: TokenAirdropDapp = {

    "version": "0.1.0",
    "name": "token_airdrop_dapp",
    "address": "5f9SViZQr76U5V7sHpzBRrBEJ6ypjd4gfQWPdM2Rta7T",
    "metadata": {
      "name": "token_airdrop_dapp",
      "version": "0.1.0",
      "spec": "0.1.0",
      "description": "Claim your airdrop"
    },
    "instructions": [
      {
        "name": "initializeAirdrop",
        "accounts": [
          {
            "name": "tokenAtaForProgram",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "data",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "tokenMint",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "tokenAtaForAdmin",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "admin",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "tokenProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "rent",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "airdropAmount",
            "type": "u64"
          }
        ]
      },
      {
        "name": "depositTokens",
        "accounts": [
          {
            "name": "tokenAtaForProgram",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "data",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "tokenMint",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "tokenAtaForAdmin",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "admin",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "tokenProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "amount",
            "type": "u64"
          }
        ]
      },
      {
        "name": "claimAirdrop",
        "accounts": [
          {
            "name": "tokenAtaForProgram",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "data",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "tokenMint",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "tokenAtaForUser",
            "isMut": true,
            "isSigner": false
          },
          {
            "name": "user",
            "isMut": true,
            "isSigner": true
          },
          {
            "name": "admin",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "tokenProgram",
            "isMut": false,
            "isSigner": false
          },
          {
            "name": "systemProgram",
            "isMut": false,
            "isSigner": false
          }
        ],
        "args": [
          {
            "name": "tokenAtaForProgramBump",
            "type": "u8"
          }
        ]
      }
    ],
    "accounts": [
      {
        "name": "data",
        "type": {
          "kind": "struct",
          "fields": [
            {
              "name": "admin",
              "type": "publicKey"
            },
            {
              "name": "totalTokens",
              "type": "u64"
            },
            {
              "name": "tokensDistributed",
              "type": "u64"
            },
            {
              "name": "claimedAddresses",
              "type": {
                "vec": "publicKey"
              }
            }
          ]
        }
      }
    ],
    "errors": [
      {
        "code": 6000,
        "name": "Overflow",
        "msg": "Arithmetic Overflow"
      },
      {
        "code": 6001,
        "name": "InvalidAdmin",
        "msg": "Invalid Admin"
      },
      {
        "code": 6002,
        "name": "AlreadyClaimed",
        "msg": "Already claimed airdrop"
      },
      {
        "code": 6003,
        "name": "InsufficientTokens",
        "msg": "Insufficient tokens"
      }
    ]
  };
  