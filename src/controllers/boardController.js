const prisma = require('../config/db');

const getAllBoards = async (req, res) => {
    try {
        const boards = await prisma.board.findMany({
            where: { deletedAt: null },
        });
        res.json(boards);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve boards' });
    }
};

const getBoardById = async (req, res) => {
    const { id } = req.params;
    try {
        const board = await prisma.board.findUnique({
            where: { id: parseInt(id) },
        });
        if (board && !board.deletedAt) {
            res.json(board);
        } else {
            res.status(404).json({ error: 'Board not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve board' });
    }
};

const createBoard = async (req, res) => {
    const { author, name } = req.body;
    try {
        const newBoard = await prisma.board.create({
            data: { author, name },
        });
        res.json(newBoard);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create board' });
    }
};

const updateBoard = async (req, res) => {
    const { id } = req.params;
    const { author, name } = req.body;
    try {
        const updatedBoard = await prisma.board.update({
            where: { id: parseInt(id) },
            data: { author, name },
        });
        res.json(updatedBoard);
    } catch (error) {
        res.status(400).json({ error: 'Failed to update board' });
    }
};

const DeleteBoard = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedBoard = await prisma.board.update({
            where: { id: parseInt(id) },
            data: { deletedAt: new Date() },
        });
        res.json({ message: 'Board deleted successfully', board: deletedBoard });
    } catch (error) {
        res.status(400).json({ error: 'Failed to delete board' });
    }
};

module.exports = {
    getAllBoards,
    getBoardById,
    createBoard,
    updateBoard,
    DeleteBoard,
};
