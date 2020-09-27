const mongoose = require('mongoose');

const strategiesSchema = new mongoose.Schema({
  studentowner: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  teacher: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  enable: {type:Boolean, default:true }, //the first strategie is always enabled
  stage: {
    type: Number,
    min: 1, max: 3,
    default: 1
  },
  questions: {
    atnPronunciacion: { type: Number, min: 0, max: 5, default: 0},
    miTiempo: { type: Number, min: 0, max: 5, default: 0},
    tono: { type: Number, min: 0, max: 5, default: 0},
    adecuo: { type: Number, min: 0, max: 5, default: 0},
    pronunciacion: { type: Number, min: 0, max: 5, default: 0},
    doyEntender: { type: Number, min: 0, max: 5, default: 0},
    atnReacciones: { type: Number, min: 0, max: 5, default: 0},
    confirmo: { type: Number, min: 0, max: 5, default: 0},
    askAclaraciones: { type: Number, min: 0, max: 5, default: 0},
    contactoVisual: { type: Number, min: 0, max: 5, default: 0},
    atnGestos: { type: Number, min: 0, max: 5, default: 0},
    utlRelleno: { type: Number, min: 0, max: 5, default: 0},
    animo: { type: Number, min: 0, max: 5, default: 0},
    relax: { type: Number, min: 0, max: 5, default: 0},
    enjoy: { type: Number, min: 0, max: 5, default: 0},
    participate: { type: Number, min: 0, max: 5, default: 0},
    atnGramar: { type: Number, min: 0, max: 5, default: 0},
    atnFrases: { type: Number, min: 0, max: 5, default: 0},
    angloparlante: { type: Number, min: 0, max: 5, default: 0},
    parafraseo: { type: Number, min: 0, max: 5, default: 0},
    pnsLuegoHablo: { type: Number, min: 0, max: 5, default: 0},
    pnsfrases: { type: Number, min: 0, max: 5, default: 0},
    atnSujetoVerbo: { type: Number, min: 0, max: 5, default: 0},
    ideaPrincipal: { type: Number, min: 0, max: 5, default: 0},
    intPalabrasFamiliares: { type: Number, min: 0, max: 5, default: 0},
    atnPrimeraParteOraciones: { type: Number, min: 0, max: 5, default: 0},
    atnEnfasis: { type: Number, min: 0, max: 5, default: 0},
    contexto: { type: Number, min: 0, max: 5, default: 0},
    intSeguir: { type: Number, min: 0, max: 5, default: 0},
    calm: { type: Number, min: 0, max: 5, default: 0},
  },
}, {
    timestamps: true,
    toJSON: {
      virtuals: true,
      transform: (doc, ret) => {
        ret.id = doc._id;
        delete ret._id;
        delete ret.__v;
        return ret
      }
    }
  })


const Strategies = mongoose.model('Strategies', strategiesSchema);
module.exports = Strategies;