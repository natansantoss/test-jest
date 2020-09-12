import { createConnection } from 'typeorm'

createConnection().then(() => console.log('connected in the DataBase'))
