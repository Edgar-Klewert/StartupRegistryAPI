import { createReadStream } from "fs";
import { Transform, Writable } from "stream";
import csvtojson from 'csvtojson'
import prismaClient from "./src/prisma";

createReadStream('./startup-data.csv')
.pipe(csvtojson())
.pipe(new Transform({
    transform(chunk, enconding, cb) {
        const chunked = JSON.parse(chunk.toString())
        const data = JSON.stringify({
            city: chunked.city,
            name: chunked.name,
        })
        
        cb(null, Buffer.from(data))
    }
}))
.pipe(new Writable({
    async write(chunk, _, callback) {
        const data: {
            name: string
            city: string
        } = JSON.parse(chunk.toString())

        await prismaClient.startup.create({
            data
        })

        callback()
    }
}))
