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
    atnPronunciacion: { type: Number, min: 0, max: 5},
    miTiempo: { type: Number, min: 0, max: 5},
    tono: { type: Number, min: 0, max: 5},
    adecuo: { type: Number, min: 0, max: 5},
    pronunciacion: { type: Number, min: 0, max: 5},
    doyEntender: { type: Number, min: 0, max: 5},
    atnReacciones: { type: Number, min: 0, max: 5},
    confirmo: { type: Number, min: 0, max: 5},
    askAclaraciones: { type: Number, min: 0, max: 5},
    contactoVisual: { type: Number, min: 0, max: 5},
    atnGestos: { type: Number, min: 0, max: 5},
    utlRelleno: { type: Number, min: 0, max: 5},
    animo: { type: Number, min: 0, max: 5},
    relax: { type: Number, min: 0, max: 5},
    enjoy: { type: Number, min: 0, max: 5},
    participate: { type: Number, min: 0, max: 5},
    atnGramar: { type: Number, min: 0, max: 5},
    atnFrases: { type: Number, min: 0, max: 5},
    angloparlante: { type: Number, min: 0, max: 5},
    parafraseo: { type: Number, min: 0, max: 5},
    pnsLuegoHablo: { type: Number, min: 0, max: 5},
    pnsfrases: { type: Number, min: 0, max: 5},
    atnSujetoVerbo: { type: Number, min: 0, max: 5},
    ideaPrincipal: { type: Number, min: 0, max: 5},
    intPalabrasFamiliares: { type: Number, min: 0, max: 5},
    atnPrimeraParteOraciones: { type: Number, min: 0, max: 5},
    atnEnfasis: { type: Number, min: 0, max: 5},
    contexto: { type: Number, min: 0, max: 5},
    intSeguir: { type: Number, min: 0, max: 5},
    calm: { type: Number, min: 0, max: 5},
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