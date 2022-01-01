import miista from './miista-export.json'

export default function handler(req, res) {
  res.status(200).json(miista)
}
