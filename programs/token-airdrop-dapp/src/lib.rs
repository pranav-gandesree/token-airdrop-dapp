
// pub mod error;

// use anchor_lang:: prelude::*;
// use anchor_spl::token::{ Mint, Token, TokenAccount};

// declare_id!("FAnXPxphmbwHJANagSzTx1Mpw1Ad5xsieFBBK975gXmC");

// pub const AIRDROP_MINT_ADDRESS :&str = "8iMpYJ5LhT3DPnGHU3pvpPkyY5gN2mWmVrF67KesjFUY";
// pub const AIRDROP_AMOUNT: u64 = 111; // airdrop amount for each claim
// pub const TOKEN_DECIMALS: u64 = 1_000_000_000; 


// #[program]
// pub mod token_airdrop_dapp {
//     use super::*;

//     pub fn initialize_airdrop(ctx: Context<InitializeAirdrop>, aidrop_amount: u64) -> Result<()> {
//         msg!("creating program ata to hold the airdrop tokens");

//         //convert amount to token decimals
//         let raw_amount = airdrop_amount
//             .checked_mul(TOKEN_DECIMALS)
//             .ok_or(ErrorCode::Overflow);

//         let cpi_ctx = CpiContext::new{
//             program: ctx.accounts.token_program.to_account_info(),
//             accounts: token::Transfer{
//                 from: ctx.accounts.token_ata_for_admin.to_account_info(),
//                 to: ctx.accounts.token_ata_for_program.to_account_info(),
//                 authority: ctx.accounts.admin.to_account_info()
//             }
//         };

//         token::transfer(cpi_ctx, raw_amount);
//         msg!("transferred {} tokens to program ATA", airdrop_amount);

//         let data = &mut ctx.accounts.data;

//         data.admin = *ctx.accounts.admin.key;
//         data.total_tokens = aidrop_amount;
//         data.tokens_distributed = 0;
//         msg!("initialzed airdrop data");
//         Ok(());
//     }   

//     pub fn deposit_tokens(ctx: Context<DepositTokens>, amount: u64) -> Result<()> {
//         if ctx.accounts.data.admin != *ctx.accounts.admin.key {
//             return Err(error!(ErrorCode::InvalidAdmin));
//         }

//         //convert amount to token decimals
//         let raw_amount = airdrop_amount
//             .checked_mul(TOKEN_DECIMALS)
//             .ok_or(ErrorCode::Overflow);

//             let cpi_ctx = CpiContext::new{
//                 program: ctx.accounts.token_program.to_account_info(),
//                 accounts: token::Transfer{
//                     from: ctx.accounts.token_ata_for_admin.to_account_info(),
//                     to: ctx.accounts.token_ata_for_program.to_account_info(),
//                     authority: ctx.accounts.admin.to_account_info()
//                 }
//             };
//             token::transfer(cpi_ctx, raw_amount)?;

//             let data = &mut ctx.accounts.data;
//             data.total_tokens += amount;

//             msg!("deposited {} extra tokens ", amount);

//         Ok(());
//     }

//     pub fn claim_airdrop(ctx: Context<ClaimAirDrop>, _token_ata_for_program_bump: u8) -> Result<()>{
//         let user_key = ctx.accounts.user.key();
//         let data = &mut ctx.accounts.data;

//         //check if user has already claimed the airdrop
//                if data.claimed_addresses.iter().any(|&addr : Pubkey| addr == user_key) {
//             return Err(error!(ErrorCode::AlreadyClaimed));
//         }

//         //convert token amount to include decimals for spl transfer
//         let raw_token_amount = airdrop_amount
//             .checked_mul(TOKEN_DECIMALS)
//             .ok_or(ErrorCode::Overflow);

//         //transfer tokens from program to user using raw amount
//         let token_mint_address = ctx.accounts.token_mint.key();
//         let seeds = &[token_mint_address.as_ref(), &[_token_ata_for_program_bump]];
//         let signer = [&seeds[..]];

//         let cpi_ctx = CpiContext::new_with_signer{
//             program: ctx.accounts.token_program.to_account_info(),
//                 accounts: token::Transfer{
//                     from: ctx.accounts.token_ata_for_program.to_account_info(),
//                     to: ctx.accounts.token_ata_for_user.to_account_info(),
//                     authority: ctx.accounts.program.to_account_info(),
//                 },
//                 signer_seeds: &signer,
//             };

            
//         token::transfer(cpi_ctx, raw_token_amount)?;

//         //update tokens distributed and add user to claimed list
//         data.tokens_distributed= data.tokens_distributed
//                                     .checked_add(AIRDROP_AMOUNT)
//                                     .ok_or(ErrorCode::Overflow);

//         data.claimed_addresses.push(user_key);

//         msg!("transferred {} tokens to user  ", AIRDROP_AMOUNT);
        
//         Ok(());
//     }
// }






// #[derive(Accounts)]
// pub struct InitializeAirdrop<'info> {
//     #[account(
//         init,
//         payer = admin,
//         seeds = [AIRDROP_MINT_ADDRESS.parse::<Pubkey>().unwrap().as_ref()],
//         bump,
//         token::mint = token_mint,
//         token::authority = token_ata_for_program,
//     )]
//     pub token_ata_for_program: Account<'info, TokenAccount>,

//     #[account(
//         init,
//         payer = admin,
//         space = 9000,
//         seeds = [b"data", admin.key().as_ref()],
//         bump
//     )]
//     pub data: Account<'info, Data>,

//     #[account(
//         address = AIRDROP_MINT_ADDRESS.parse::<Pubkey>().unwrap(),
//     )]
//     pub token_mint: Account<'info, Mint>,

//     #[account(mut)]
//     pub token_ata_for_admin: Account<'info, TokenAccount>,

//     #[account(mut)]
//     pub admin: Signer<'info>,

//     pub system_program: Program<'info, System>,
//     pub token_program: Program<'info, Token>,
//     pub rent: Sysvar<'info, Rent>

// }


// #[derive(Accounts)]
// pub struct DepositTokens<'info>{
//     #[account(mut)]
//     pub token_ata_for_program: Account<'info, TokenAccount>,

//     #[account(mut)]
//     pub data: Account<'info, Data>,

//     #[account(
//         address = AIRDROP_MINT_ADDRESS.parse::<Pubkey>().unwrap(),
//     )]
//     pub token_mint: Account<'info, Mint>,

//     #[account(mut)]
//     pub token_ata_for_admin: Account<'info, TokenAccount>,

//     #[account(mut)]
//     pub admin: Signer<'info>,

//     pub token_program: Program<'info, Token>,
// }

// #[derive(Accounts)]
// #[instruction(_token_ata_for_program_bump: u8)]
// pub struct ClaimAirDrop<'info>{
//     #[account(
//         mut,
//         seeds = [token_mint.key().as_ref()],
//         bump = _token_ata_for_program_bump
//     )]
//     pub token_ata_for_program: Account<'info, TokenAccount>,

//     #[account(mut)]
//     pub data: Account<'info, Data>,

//     #[account(
//         address = AIRDROP_MINT_ADDRESS.parse::<Pubkey>().unwrap(),
//     )]
//     pub token_mint: Account<'info, Mint>,

//     #[account(mut)]
//     pub token_ata_for_user: Account<'info, TokenAccount>,

//     #[account(mut)]
//     pub user: Signer<'info>,

//     //check:
//     pub admin: AccountInfo<'info>,

//     pub token_program: Program<'info, Token>,
//     pub system_program: Program<'info, System>,

// }

// #[account]
// pub struct Data{
//     pub admin: Pubkey,
//     pub total_tokens: u64,
//     pub tokens_distributed: u64,
//     pub claimed_addresses: Vec<Pubkey>
// }








































pub mod error;

use error::ErrorCode;
use anchor_lang::prelude::*;
use anchor_spl::token::{self, Mint, Token, TokenAccount};

declare_id!("FAnXPxphmbwHJANagSzTx1Mpw1Ad5xsieFBBK975gXmC");


pub const AIRDROP_MINT_ADDRESS: &str = "8iMpYJ5LhT3DPnGHU3pvpPkyY5gN2mWmVrF67KesjFUY";
pub const AIRDROP_AMOUNT: u64 = 111; // airdrop amount for each claim
pub const TOKEN_DECIMALS: u64 = 1_000_000_000;

#[program]
pub mod token_airdrop_dapp {
    use super::*;

    pub fn initialize_airdrop(ctx: Context<InitializeAirdrop>, airdrop_amount: u64) -> Result<()> {
        msg!("Creating program ATA to hold the airdrop tokens");

        // Convert amount to token decimals
        let raw_amount = airdrop_amount
            .checked_mul(TOKEN_DECIMALS)
            .ok_or(ErrorCode::Overflow)?;

        let cpi_ctx = CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            token::Transfer {
                from: ctx.accounts.token_ata_for_admin.to_account_info(),
                to: ctx.accounts.token_ata_for_program.to_account_info(),
                authority: ctx.accounts.admin.to_account_info(),
            },
        );

        token::transfer(cpi_ctx, raw_amount)?;
        msg!("Transferred {} tokens to program ATA", airdrop_amount);

        let data = &mut ctx.accounts.data;
        data.admin = *ctx.accounts.admin.key;
        data.total_tokens = airdrop_amount;
        data.tokens_distributed = 0;
        data.claimed_addresses = Vec::new();
        
        msg!("Initialized airdrop data");
        Ok(())
    }

    pub fn deposit_tokens(ctx: Context<DepositTokens>, amount: u64) -> Result<()> {
        if ctx.accounts.data.admin != *ctx.accounts.admin.key {
            return Err(error!(ErrorCode::InvalidAdmin));
        }

        // Convert amount to token decimals
        let raw_amount = amount
            .checked_mul(TOKEN_DECIMALS)
            .ok_or(ErrorCode::Overflow)?;

        let cpi_ctx = CpiContext::new(
            ctx.accounts.token_program.to_account_info(),
            token::Transfer {
                from: ctx.accounts.token_ata_for_admin.to_account_info(),
                to: ctx.accounts.token_ata_for_program.to_account_info(),
                authority: ctx.accounts.admin.to_account_info(),
            },
        );
        
        token::transfer(cpi_ctx, raw_amount)?;

        let data = &mut ctx.accounts.data;
        data.total_tokens = data.total_tokens
            .checked_add(amount)
            .ok_or(ErrorCode::Overflow)?;

        msg!("Deposited {} extra tokens", amount);
        Ok(())
    }

    pub fn claim_airdrop(ctx: Context<ClaimAirdrop>, token_ata_for_program_bump: u8) -> Result<()> {
        let user_key = ctx.accounts.user.key();
        let data = &mut ctx.accounts.data;

        // Check if user has already claimed the airdrop
        if data.claimed_addresses.iter().any(|&addr| addr == user_key) {
            return Err(error!(ErrorCode::AlreadyClaimed));
        }

        // Check if there are enough tokens left
        if data.tokens_distributed >= data.total_tokens {
            return Err(error!(ErrorCode::InsufficientTokens));
        }

        // Convert token amount to include decimals for spl transfer
        let raw_token_amount = AIRDROP_AMOUNT
            .checked_mul(TOKEN_DECIMALS)
            .ok_or(ErrorCode::Overflow)?;

        // Transfer tokens from program to user using raw amount
        let token_mint_address = ctx.accounts.token_mint.key();
        let seeds = &[token_mint_address.as_ref(), &[token_ata_for_program_bump]];
        let signer = [&seeds[..]];

        let cpi_ctx = CpiContext::new_with_signer(
            ctx.accounts.token_program.to_account_info(),
            token::Transfer {
                from: ctx.accounts.token_ata_for_program.to_account_info(),
                to: ctx.accounts.token_ata_for_user.to_account_info(),
                authority: ctx.accounts.token_ata_for_program.to_account_info(),
            },
            &signer,
        );

        token::transfer(cpi_ctx, raw_token_amount)?;

        // Update tokens distributed and add user to claimed list
        data.tokens_distributed = data.tokens_distributed
            .checked_add(AIRDROP_AMOUNT)
            .ok_or(ErrorCode::Overflow)?;

        data.claimed_addresses.push(user_key);

        msg!("Transferred {} tokens to user", AIRDROP_AMOUNT);
        Ok(())
    }
}

#[derive(Accounts)]
pub struct InitializeAirdrop<'info> {
    #[account(
        init,
        payer = admin,
        seeds = [AIRDROP_MINT_ADDRESS.parse::<Pubkey>().unwrap().as_ref()],
        bump,
        token::mint = token_mint,
        token::authority = admin,
    )]
    pub token_ata_for_program: Account<'info, TokenAccount>,

    #[account(
        init,
        payer = admin,
        space = 8 + 32 + 8 + 8 + (32 * 100), // Allow for 100 claimed addresses
        seeds = [b"data", admin.key().as_ref()],
        bump
    )]
    pub data: Account<'info, Data>,

    #[account(
        address = AIRDROP_MINT_ADDRESS.parse::<Pubkey>().unwrap(),
    )]
    pub token_mint: Account<'info, Mint>,

    #[account(
        mut,
        constraint = token_ata_for_admin.mint == token_mint.key(),
        constraint = token_ata_for_admin.owner == admin.key()
    )]
    pub token_ata_for_admin: Account<'info, TokenAccount>,

    #[account(mut)]
    pub admin: Signer<'info>,

    pub system_program: Program<'info, System>,
    pub token_program: Program<'info, Token>,
    pub rent: Sysvar<'info, Rent>,
}

#[derive(Accounts)]
pub struct DepositTokens<'info> {
    #[account(
        mut,
        constraint = token_ata_for_program.mint == token_mint.key()
    )]
    pub token_ata_for_program: Account<'info, TokenAccount>,

    #[account(
        mut,
        constraint = data.admin == *admin.key
    )]
    pub data: Account<'info, Data>,

    #[account(
        address = AIRDROP_MINT_ADDRESS.parse::<Pubkey>().unwrap(),
    )]
    pub token_mint: Account<'info, Mint>,

    #[account(
        mut,
        constraint = token_ata_for_admin.mint == token_mint.key(),
        constraint = token_ata_for_admin.owner == admin.key()
    )]
    pub token_ata_for_admin: Account<'info, TokenAccount>,

    #[account(mut)]
    pub admin: Signer<'info>,

    pub token_program: Program<'info, Token>,
}

#[derive(Accounts)]
#[instruction(token_ata_for_program_bump: u8)]
pub struct ClaimAirdrop<'info> {
    #[account(
        mut,
        seeds = [token_mint.key().as_ref()],
        bump = token_ata_for_program_bump,
        constraint = token_ata_for_program.mint == token_mint.key()
    )]
    pub token_ata_for_program: Account<'info, TokenAccount>,

    #[account(mut)]
    pub data: Account<'info, Data>,

    #[account(
        address = AIRDROP_MINT_ADDRESS.parse::<Pubkey>().unwrap(),
    )]
    pub token_mint: Account<'info, Mint>,

    #[account(
        mut,
        constraint = token_ata_for_user.mint == token_mint.key(),
        constraint = token_ata_for_user.owner == user.key()
    )]
    pub token_ata_for_user: Account<'info, TokenAccount>,

    #[account(mut)]
    pub user: Signer<'info>,

    /// CHECK: Admin account is only used for verification
    pub admin: AccountInfo<'info>,

    pub token_program: Program<'info, Token>,
    pub system_program: Program<'info, System>,
}

#[account]
#[derive(Default)]
pub struct Data {
    pub admin: Pubkey,
    pub total_tokens: u64,
    pub tokens_distributed: u64,
    pub claimed_addresses: Vec<Pubkey>,
}