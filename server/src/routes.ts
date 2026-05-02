import { Router } from 'express';
import CalcadosController from './controllers/CalcadosController'; // Importa seu controller
import { readAllUsers, createUser, readUserById, updateUser, deleteUser } from './controllers/UserController';

const router = Router();

// Rotas para usuários
router.get('/users', readAllUsers);
router.post('/users', createUser);
router.get('/users/:id', readUserById);
router.put('/users/:id', updateUser);
router.delete('/users/:id', deleteUser);

// Rotas para calçados
router.post('/calcados', CalcadosController.create);
router.get('/calcados', CalcadosController.readAll);
router.get('/calcados/:id', CalcadosController.readById);
router.put('/calcados/:id', CalcadosController.update);
router.delete('/calcados/:id', CalcadosController.delete);

export default router;