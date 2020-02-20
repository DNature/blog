import { startServer } from '../startServer'
import { AddressInfo } from 'net'

export const setup = async (): Promise<void> => {
    const app = await startServer()
    const {port} = app.address() as AddressInfo;
    process.env.TEST_HOST = `http://localhost:${port}`
}