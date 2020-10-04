const Strategies = require('../models/strategies.model');
const createError = require('http-errors');

module.exports.update = (req, res, next) => {
  const studentowner = req.params.id; //student
  const stage = req.params.stg; //student
  Strategies.findOneAndUpdate(
    {studentowner, stage},
    { $set: {'questions': req.body} },
    { new: true, upsert: true, runValidators: true, useFindAndModify: false })
    .populate('studentowner')
    .populate('teacher')
    .then(Strategies => {
      if (Strategies) {
        res.status(201).json(Object.assign({}, Strategies._doc, {labels}))
      } else {
        next(createError(404, 'Strategies not found'))
      }
    })
    .catch(next)
}

module.exports.get = (req, res, next) => {
  const studentowner = req.params.id; //student
  const stage = req.params.stg; //student
  Strategies.findOne({studentowner, stage})
    .populate('studentowner')
    .populate('teacher')
    .then(({_doc}) => {
      res.status(201).json(Object.assign({}, _doc, {labels}))
    })
    .catch(next)
}

const labels = [
  {
    label: 'Presto atención a mi pronunciación, ritmo y entonación.',
    key:'atnPronunciacion',
    options: [1, 2, 3, 4, 5]
  },
  {
    label: 'Me tomo mi tiempo para expresar lo que quiero decir.',
    key:'miTiempo',
    options: [1, 2, 3, 4, 5]
  },
  {
    label: 'Intento que el tono de mi voz sea claro y adecuado.',
    key:'tono',
    options: [1, 2, 3, 4, 5]
  },
  {
    label: 'Adecúo mi mensaje según el contexto y el flujo de la conversación.',
    key:'adecuo',
    options: [1, 2, 3, 4, 5]
  },
  {
    label: 'Presto atención a la pronunciación, ritmo y entonación del otro.',
    key:'pronunciacion',
    options: [1, 2, 3, 4, 5]
  },
  {
    label: 'Doy a entender, con frases y circunloquios, que sigo la conversación.',
    key:'doyEntender',
    options: [1, 2, 3, 4, 5]
  },
  {
    label: 'Presto atención a las reacciones y solicitudes de aclaración y repetición que genera mi mensaje.',
    key:'atnReacciones',
    options: [1, 2, 3, 4, 5]
  },
  {
    label: 'Confirmo que mi interlocutor y yo estamos comprendiendo el mensaje de la conversación.',
    key:'confirmo',
    options: [1, 2, 3, 4, 5]
  },
  {
    label: 'Pido aclaraciones o repeticiones cuando es necesario.',
    key:'askAclaraciones',
    options: [1, 2, 3, 4, 5]
  },
  {
    label: 'Establezco contacto visual durante la conversación.',
    key:'contactoVisual',
    options: [1, 2, 3, 4, 5]
  },
  {
    label: 'Presto atención a los gestos y expresiones faciales de mi interlocutor.',
    key:'atnGestos',
    options: [1, 2, 3, 4, 5]
  },
  {
    label: 'Utilizo palabras de relleno para continuar con la conversación.',
    key:'utlRelleno',
    options: [1, 2, 3, 4, 5]
  },
  {
    label: 'Me animo para expresar mis ideas sin miedo a equivocarme.',
    key:'animo',
    options: [1, 2, 3, 4, 5]
  },
  {
    label: 'Intento relajarme cuando me siento nerviosa/o.',
    key:'relax',
    options: [1, 2, 3, 4, 5]
  },
  {
    label: 'Intento disfrutar de la conversación.',
    key:'enjoy',
    options: [1, 2, 3, 4, 5]
  },
  {
    label: 'Participo en la conversación, aunque pueda cometer errores.',
    key:'participate',
    options: [1, 2, 3, 4, 5]
  },
  {
    label: 'Presto atención a las estructuras gramaticales y el orden de las palabras.',
    key:'atnGramar',
    options: [1, 2, 3, 4, 5]
  },
  {
    label: 'Presto atención a frases y expresiones que ayudan a seguir la conversación.' ,
    key:'atnFrases',
    options: [1, 2, 3, 4, 5]
  },
  {
    label: 'Intento hablar como un angloparlante.',
    key:'angloparlante',
    options: [1, 2, 3, 4, 5]
  },
  {
    label: 'Parafraseo el mensaje original utilizando expresiones más sencillas y familiares.',
    key:'parafraseo',
    options: [1, 2, 3, 4, 5]
  },
  {
    label: 'Pienso mis ideas en mi L1 y luego las cambio al inglés.' ,
    key:'pnsLuegoHablo',
    options: [1, 2, 3, 4, 5]
  },
  {
    label: 'Pienso en una frase que ya conozco en inglés y busco adaptarla a la conversación.' ,
    key:'pnsfrases',
    options: [1, 2, 3, 4, 5]
  },
  {
    label: 'Presto atención al sujeto y al verbo de la oración cuando escucho.',
    key:'atnSujetoVerbo',
    options: [1, 2, 3, 4, 5]
  },
  {
    label: 'Intento identificar la idea principal de la conversación.',
    key:'ideaPrincipal',
    options: [1, 2, 3, 4, 5]
  },
  {
    label: 'Identifico palabras familiares para deducir la intención del hablante.',
    key:'intPalabrasFamilia,res',
    options: [1, 2, 3, 4, 5]
  },
  {
    label: 'Presto atención a la primera parte de las oraciones para identificar si es una pregunta o no.',
    key:'atnPrimeraParteOra,ciones',
    options: [1, 2, 3, 4, 5]
  },
  {
    label: 'Presto atención a las palabras que el interlocutor enfatiza.',
    key:'atnEnfasis',
    options: [1, 2, 3, 4, 5]
  },
  {
    label: 'Deduzco la intención del hablante basándome en el contexto.',
    key:'contexto',
    options: [1, 2, 3, 4, 5]
  },
  {
    label: 'Intento seguir la conversación incluso cuando no entiendo todo lo que se está diciendo.' ,
    key:'intSeguir',
    options: [1, 2, 3, 4, 5]
  },
  {
    label: 'Intento permanecer calmado incluso cuando tengo dificultades para seguir la conversación.',
    key:'calm',
    options: [1, 2, 3, 4, 5]
  }
]

