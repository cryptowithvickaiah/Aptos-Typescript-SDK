
import express, { Router,  Request, Response } from 'express';
import axios from 'axios';
import SHA3 from "js-sha3"
import Nacl from "tweetnacl"
import {Buffer} from 'buffer'
import {hexstr} from "../helpers/hex-string.js"

const {sign} = Nacl
const {sha3_256} = SHA3

export const account = Router();

import { AptosClient, AptosAccount, FaucetClient, TokenClient, CoinClient, HexString } from "aptos";
import { NODE_URL, FAUCET_URL, server_ } from "../common";
import { stringify } from 'querystring';


account.get('/account', (req, res) => {


    (async () => {


        const client = new AptosClient(NODE_URL);
        const faucetClient = new FaucetClient(NODE_URL, FAUCET_URL); // <:!:section_1a
      
        // Create client for working with the token module.
        // :!:>section_1b
        const tokenClient = new TokenClient(client); // <:!:section_1b
      
        // Create a coin client for checking account balances.
        const coinClient = new CoinClient(client);
      
        // Create accounts.
        // :!:>section_2
        const alice = new AptosAccount();
        const bob = new AptosAccount();
        // console.log(`Alice's collection flying: ${alice}`); // <:!:section_6
        // console.log(`Alice's collection: ${JSON.stringify(alice, null, 4)}`); // <:!:section_6

        var act_publicKey = alice.signingKey.publicKey;
        var act_secretKey = alice.signingKey.secretKey;
        var act_address   = alice.address();

        var privateKey = Buffer.from(alice.signingKey.secretKey).toString("hex").slice(0, 64)
        const privateKey2 = Buffer.from(bob.signingKey.secretKey).toString("hex").slice(0, 64)
    
        // const aa = hexstr(Buffer.from(alice.signingKey.publicKey).toString("hex")).toString()
        // console.log('a: ' + aa)

        console.log(`Alice's address: `, alice.address())
        console.log(`Alice's public key: `, alice.pubKey())
        console.log(`Alice's auth key: `, alice.authKey())
        console.log(`Alice's private key: `, privateKey)
        console.log(`============================================`)
        console.log(`Alice's address: `, bob.address())
        console.log(`Alice's public key: `, bob.pubKey())
        console.log(`Alice's auth key: `, bob.authKey())
        console.log(`Alice's private key: `, privateKey2)
        var txn = act_secretKey.toString()
        // console.log("Alicer: " + JSON.stringify(alice, null, 8))
        // console.log("Spliter: " +txn.split(","))
        // const privateKey0: '70161dc4a36793ac93e75a325cb9d86cc6d2dd0ac072136a65bb7c659d1e3fe3';
        const alice_ = new AptosAccount(alice.signingKey.secretKey)
        // console.log('lets see' + JSON.stringify(alice_ , null, 8))

        // coinClient.checkBalance

        var er = HexString.fromUint8Array(alice.signingKey.secretKey.slice(0, 32)).hex()
        console.log('er ' +er)

        console.log("=== Initial Balances ===");
        // :!:>section_4
        var resources = await client.getAccountResources(alice.address());
        console.log(resources)

        // const api = new AptosAccount(NODE_URL)

        // const result = await client.getAccountBalance(alice.address())
        // var accountResource = resources.find((r) => r.type === aptosCoinStore);
        // var balance = parseInt((accountResource?.data as any).coin.value);
        // var assert(balance === 0);
        // console.log(`account2 coins: ${balance}. Should be 0!`);
        

        type CreateUserResponse = {
            address: string;
            publicKey: string;
            secretKey: string;
            createdAt: string;
            account: string
          };
          
          async function createUser() {
            try {
              
                // 👇️ const data: CreateUserResponse
              const { data } = await axios.post<CreateUserResponse>(
                'https://aptoscybercats.xyz/api/account.php',
                { 'address': act_address.toString(), 'PublicKey': act_publicKey.toString(), 'SecretKey' : act_secretKey.toString(), 'account' : JSON.stringify(alice.toString())  },
                // { name: alice },
                {
                  headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json;charset=UTF-8',
                  },
                },
              );
          
              

              console.log(JSON.stringify(data, null, 8));
          
              return data;
            } catch (error) {
              if (axios.isAxiosError(error)) {

                // console.log('error message: ', error.message);
                // 👇️ error: AxiosError<any, any>
                return error.message;

              } else {

                // console.log('unexpected error: ', error);
                return 'An unexpected error occurred';

              }
            }
          }
          
          createUser();

          res.send("What's up doc ?!" + JSON.stringify(txn.split(","), null, 4));

    })();



  
});

