import { PrismaClient } from '@prisma/client';
import { Router } from 'express';
import jwt from "jsonwebtoken";

const JWT_SECRET = "somil123"

const router = Router();

const prismaClient = new PrismaClient();

//signin with wallet
//signging a message

router.post("/signin", async(req, res) =>{
    const hardCodedWalletAddress = "12yAggerdf8FQmgkBePKufoe7pyrZvBDUX3QTaqnhPCi";

    const existingUser = await prismaClient.user.findFirst({
        where:{
            address: hardCodedWalletAddress
        }
    })

    if (existingUser){
        const token =  jwt.sign({
            userId: existingUser.id
        }, JWT_SECRET)

        res.json({
            token
        })
    }else{
        const user = await prismaClient.user.create({
            data:{
                address: hardCodedWalletAddress,
            }
        })
        const token =  jwt.sign({
            userId: user.id
        }, JWT_SECRET) 

        res.json({
            token
        })
    }
});

export default router;