import { Request, Response } from "express";
import prisma from "@database";

export const readAllUsers = async (req: Request, res: Response) => {
    try {

        const users = await prisma.user.findMany();

        if (!users){
            return res.status(404).json({
                message: "Nenhum usuário criado ainda."
            })
        }

        return res.status(200).json(users)

    } catch (error){
        return res.status(400).json({
            message: "Erro ao buscar usuários",
            error,
        })
    }
}

export const createUser = async (req: Request, res: Response) => {
    try {
        const { name, email, cpf, password } = req.body;

        const user = await prisma.user.create({
            data: { name, email, cpf, password }
        });

        return res.status(201).json(user);
    } catch (error) {
        return res.status(400).json({
            message: "Erro ao criar usuário",
            error,
        });
    }
}

export const readUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const user = await prisma.user.findUnique({
            where: { id }
        });

        if (!user) {
            return res.status(404).json({
                message: "Usuário não encontrado"
            });
        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json({
            message: "Erro ao buscar usuário",
            error,
        });
    }
}

export const updateUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, email, cpf, password } = req.body;

        const user = await prisma.user.update({
            where: { id },
            data: { name, email, cpf, password }
        });

        return res.status(200).json(user);
    } catch (error) {
        return res.status(400).json({
            message: "Erro ao atualizar usuário",
            error,
        });
    }
}

export const deleteUser = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await prisma.user.delete({
            where: { id }
        });

        return res.status(200).json({
            message: "Usuário deletado com sucesso"
        });
    } catch (error) {
        return res.status(400).json({
            message: "Erro ao deletar usuário",
            error,
        });
    }
}