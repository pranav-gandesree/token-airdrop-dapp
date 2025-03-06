/**
 * Program IDL in camelCase format in order to be used in JS/TS.
 *
 * Note that this is only a type helper and is not the actual IDL. The original
 * IDL can be found at `target/idl/token_airdrop_dapp.json`.
 */
export type TokenAirdropDapp = {
  "address": "5f9SViZQr76U5V7sHpzBRrBEJ6ypjd4gfQWPdM2Rta7T",
  "metadata": {
    "name": "tokenAirdropDapp",
    "version": "0.1.0",
    "spec": "0.1.0",
    "description": "claim your token aidrop"
  },
  "instructions": [
    {
      "name": "claimAirdrop",
      "discriminator": [
        137,
        50,
        122,
        111,
        89,
        254,
        8,
        20
      ],
      "accounts": [
        {
          "name": "tokenAtaForProgram",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "account",
                "path": "tokenMint"
              }
            ]
          }
        },
        {
          "name": "data",
          "writable": true
        },
        {
          "name": "tokenMint",
          "address": "8iMpYJ5LhT3DPnGHU3pvpPkyY5gN2mWmVrF67KesjFUY"
        },
        {
          "name": "tokenAtaForUser",
          "writable": true
        },
        {
          "name": "user",
          "writable": true,
          "signer": true
        },
        {
          "name": "admin"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "tokenAtaForProgramBump",
          "type": "u8"
        }
      ]
    },
    {
      "name": "depositTokens",
      "discriminator": [
        176,
        83,
        229,
        18,
        191,
        143,
        176,
        150
      ],
      "accounts": [
        {
          "name": "tokenAtaForProgram",
          "writable": true
        },
        {
          "name": "data",
          "writable": true
        },
        {
          "name": "tokenMint",
          "address": "8iMpYJ5LhT3DPnGHU3pvpPkyY5gN2mWmVrF67KesjFUY"
        },
        {
          "name": "tokenAtaForAdmin",
          "writable": true
        },
        {
          "name": "admin",
          "writable": true,
          "signer": true
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
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
      "name": "initializeAirdrop",
      "discriminator": [
        96,
        196,
        74,
        102,
        61,
        195,
        48,
        184
      ],
      "accounts": [
        {
          "name": "tokenAtaForProgram",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  114,
                  154,
                  41,
                  154,
                  16,
                  138,
                  96,
                  161,
                  182,
                  70,
                  123,
                  85,
                  102,
                  246,
                  83,
                  217,
                  53,
                  204,
                  225,
                  39,
                  25,
                  174,
                  60,
                  40,
                  83,
                  195,
                  43,
                  215,
                  223,
                  173,
                  250,
                  133
                ]
              }
            ]
          }
        },
        {
          "name": "data",
          "writable": true,
          "pda": {
            "seeds": [
              {
                "kind": "const",
                "value": [
                  100,
                  97,
                  116,
                  97
                ]
              },
              {
                "kind": "account",
                "path": "admin"
              }
            ]
          }
        },
        {
          "name": "tokenMint",
          "address": "8iMpYJ5LhT3DPnGHU3pvpPkyY5gN2mWmVrF67KesjFUY"
        },
        {
          "name": "tokenAtaForAdmin",
          "writable": true
        },
        {
          "name": "admin",
          "writable": true,
          "signer": true
        },
        {
          "name": "systemProgram",
          "address": "11111111111111111111111111111111"
        },
        {
          "name": "tokenProgram",
          "address": "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA"
        },
        {
          "name": "rent",
          "address": "SysvarRent111111111111111111111111111111111"
        }
      ],
      "args": [
        {
          "name": "airdropAmount",
          "type": "u64"
        }
      ]
    }
  ],
  "accounts": [
    {
      "name": "data",
      "discriminator": [
        206,
        156,
        59,
        188,
        18,
        79,
        240,
        232
      ]
    }
  ],
  "errors": [
    {
      "code": 6000,
      "name": "overflow",
      "msg": "Arithmetic Overflow"
    },
    {
      "code": 6001,
      "name": "invalidAdmin",
      "msg": "Invalid Admin"
    },
    {
      "code": 6002,
      "name": "alreadyClaimed",
      "msg": "Already claimed airdrop"
    },
    {
      "code": 6003,
      "name": "insufficientTokens",
      "msg": "Insufficient tokens"
    }
  ],
  "types": [
    {
      "name": "data",
      "type": {
        "kind": "struct",
        "fields": [
          {
            "name": "admin",
            "type": "pubkey"
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
              "vec": "pubkey"
            }
          }
        ]
      }
    }
  ]
};
