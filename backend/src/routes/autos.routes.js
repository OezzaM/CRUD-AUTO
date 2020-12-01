import { Router } from 'express';
const router = Router();

// Conexion base de datos
import { connect } from '../database';
import { ObjectID } from 'mongodb';

router.get('/', async (req, res) => {
    const db = await connect();
    const result = await db.collection('autos').find({}).toArray();
    res.json(result)
})

router.post('/', async (req, res) => {
    const db = await connect();
    const auto = {
        key: req.body.patente,
        color: req.body.color,
        puertas: req.body.puertas,
        observaciones: req.body.observaciones,
        patente: req.body.patente,
        modelo: req.body.modelo,
        marca: req.body.marca
    };
    const result = await db.collection('autos').insertOne(auto);
    res.json(result.ops[0]);
})

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    const db = await connect();
    const result = await db.collection('autos').deleteOne({_id: ObjectID(id)});
    if(result.result.n === 1 ){
        res.json({message: 'Auto eliminado'})
    }else{
        res.json({message: 'Error'})
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const actualizarAuto = {
        key: req.body.patente,
        color: req.body.color,
        puertas: req.body.puertas,
        observaciones: req.body.observaciones,
        patente: req.body.patente,
        modelo: req.body.modelo,
        marca: req.body.marca
    }
    const db = await connect();
    const result = await db.collection('autos').updateOne({_id: ObjectID(id)}, {$set: actualizarAuto});
    
    if(result.result.nModified === 1 ){
        res.json({message: 'Auto actualizado'})
    }else{
        res.json({message: 'Error'})
    }
})

export default router;