const Strategies = require('../models/strategies.model');
const createError = require('http-errors');

module.exports.update = (req, res, next) => {
  const studentowner = req.params.id; //student
  const stage = req.params.stg; //student
  Strategies.findOneAndUpdate(
    {studentowner, stage},
    req.body,
    { new: true, runValidators: true, useFindAndModify: false })
    .populate('studentowner')
    .populate('teacher')
    .then(Strategies => {
      if (Strategies) {
        res.status(201).json(Strategies)
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
    key:'atnPronunciacion'
  },
  {
    label: 'Me tomo mi tiempo para expresar lo que quiero decir.',
    key:'miTiempo'
  },
  {
    label: 'Intento que el tono de mi voz sea claro y adecuado.',
    key:'tono'
  },
  {
    label: 'Adecúo mi mensaje según el contexto y el flujo de la conversación.',
    key:'adecuo'
  },
  {
    label: 'Presto atención a la pronunciación, ritmo y entonación del otro.',
    key:'pronunciacion'
  },
  {
    label: 'Doy a entender, con frases y circunloquios, que sigo la conversación.',
    key:'doyEntender'
  },
  {
    label: 'Presto atención a las reacciones y solicitudes de aclaración y repetición que genera mi mensaje.',
    key:'atnReacciones'
  },
  {
    label: 'Confirmo que mi interlocutor y yo estamos comprendiendo el mensaje de la conversación.',
    key:'confirmo'
  },
  {
    label: 'Pido aclaraciones o repeticiones cuando es necesario.',
    key:'askAclaraciones'
  },
  {
    label: 'Establezco contacto visual durante la conversación.',
    key:'contactoVisual'
  },
  {
    label: 'Presto atención a los gestos y expresiones faciales de mi interlocutor.',
    key:'atnGestos'
  },
  {
    label: 'Utilizo palabras de relleno para continuar con la conversación.',
    key:'utlRelleno'
  },
  {
    label: 'Me animo para expresar mis ideas sin miedo a equivocarme.',
    key:'animo'
  },
  {
    label: 'Intento relajarme cuando me siento nerviosa/o.',
    key:'relax'
  },
  {
    label: 'Intento disfrutar de la conversación.',
    key:'enjoy'
  },
  {
    label: 'Participo en la conversación, aunque pueda cometer errores.',
    key:'participate'
  },
  {
    label: 'Presto atención a las estructuras gramaticales y el orden de las palabras.',
    key:'atnGramar'
  },
  {
    label: 'Presto atención a frases y expresiones que ayudan a seguir la conversación.' ,
    key:'atnFrases'
  },
  {
    label: 'Intento hablar como un angloparlante.',
    key:'angloparlante'
  },
  {
    label: 'Parafraseo el mensaje original utilizando expresiones más sencillas y familiares.',
    key:'parafraseo'
  },
  {
    label: 'Pienso mis ideas en mi L1 y luego las cambio al inglés.' ,
    key:'pnsLuegoHablo'
  },
  {
    label: 'Pienso en una frase que ya conozco en inglés y busco adaptarla a la conversación.' ,
    key:'pnsfrases'
  },
  {
    label: 'Presto atención al sujeto y al verbo de la oración cuando escucho.',
    key:'atnSujetoVerbo'
  },
  {
    label: 'Intento identificar la idea principal de la conversación.',
    key:'ideaPrincipal'
  },
  {
    label: 'Identifico palabras familiares para deducir la intención del hablante.',
    key:'intPalabrasFamiliares'
  },
  {
    label: 'Presto atención a la primera parte de las oraciones para identificar si es una pregunta o no.',
    key:'atnPrimeraParteOraciones'
  },
  {
    label: 'Presto atención a las palabras que el interlocutor enfatiza.',
    key:'atnEnfasis'
  },
  {
    label: 'Deduzco la intención del hablante basándome en el contexto.',
    key:'contexto'
  },
  {
    label: 'Intento seguir la conversación incluso cuando no entiendo todo lo que se está diciendo.' ,
    key:'intSeguir'
  },
  {
    label: 'Intento permanecer calmado incluso cuando tengo dificultades para seguir la conversación.',
    key:'calm'
  }
]

