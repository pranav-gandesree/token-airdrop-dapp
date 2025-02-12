use anchor_lang::prelude::*;

#[error_code]
pub enum ErrorCode {
    #[msg("Arithmetic Overflow")]
    Overflow,
    #[msg("Invalid Admin")]
    InvalidAdmin,
    #[msg("Already claimed airdrop")]
    AlreadyClaimed,
    #[msg("Insufficient tokens")]
    InsufficientTokens
}