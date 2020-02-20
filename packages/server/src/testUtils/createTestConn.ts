import { getConnectionOptions, createConnection, Connection } from 'typeorm'

export const createTestConn = async (resetDB = false): Promise<Connection> => {
    const connectionOptions = await getConnectionOptions(process.env.NODE_ENV)
    return await createConnection({
        ...connectionOptions,
        name: 'default',
        synchronize: resetDB,
        dropSchema: resetDB
    })
}