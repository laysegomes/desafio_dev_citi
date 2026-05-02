import { Request, Response } from 'express';
import prisma from '../database';

export default {
  // Operação: Create (Cadastrar calçado no estoque)
  async create(req: Request, res: Response) {
    try {
      const { nome_produto, cor, marca, tamanho, preco, quantidade_em_estoque } = req.body;
      
      // Tentativa de salvar no banco
      const novo = await prisma.calcado.create({ 
        data: { nome_produto, cor, marca, tamanho, preco, quantidade_em_estoque }
      });

      return res.status(201).json(novo);

    } catch (error) {
      // ESTA É A LANTERNA:
      console.log("======= ERRO TÉCNICO AQUI =======");
      console.log(error); 
      console.log("=================================");

      return res.status(400).json({ error: "Erro ao cadastrar calçado" });
    }
  },

  // Operação: Read All (Listar todos os calçados)
  async readAll(req: Request, res: Response) {
    try {
      const calcados = await prisma.calcado.findMany();

      return res.status(200).json(calcados);
    } catch (error) {
      console.log("======= ERRO TÉCNICO AQUI =======");
      console.log(error); 
      console.log("=================================");

      return res.status(400).json({ error: "Erro ao buscar calçados" });
    }
  },

  // Operação: Read By Id (Buscar calçado por ID)
  async readById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const calcado = await prisma.calcado.findUnique({
        where: { id: parseInt(id) }
      });

      if (!calcado) {
        return res.status(404).json({ error: "Calçado não encontrado" });
      }

      return res.status(200).json(calcado);
    } catch (error) {
      console.log("======= ERRO TÉCNICO AQUI =======");
      console.log(error); 
      console.log("=================================");

      return res.status(400).json({ error: "Erro ao buscar calçado" });
    }
  },

  // Operação: Update (Atualizar calçado)
  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nome_produto, cor, marca, tamanho, preco, quantidade_em_estoque } = req.body;

      const calcado = await prisma.calcado.update({
        where: { id: parseInt(id) },
        data: { nome_produto, cor, marca, tamanho, preco, quantidade_em_estoque }
      });

      return res.status(200).json(calcado);
    } catch (error) {
      console.log("======= ERRO TÉCNICO AQUI =======");
      console.log(error); 
      console.log("=================================");

      return res.status(400).json({ error: "Erro ao atualizar calçado" });
    }
  },

  // Operação: Delete (Deletar calçado)
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;

      await prisma.calcado.delete({
        where: { id: parseInt(id) }
      });

      return res.status(200).json({ message: "Calçado deletado com sucesso" });
    } catch (error) {
      console.log("======= ERRO TÉCNICO AQUI =======");
      console.log(error); 
      console.log("=================================");

      return res.status(400).json({ error: "Erro ao deletar calçado" });
    }
  }
}