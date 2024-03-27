import https from "https";
import zlib from "zlib";

import { tsvParse } from "d3-dsv";

export async function downloadAndParseTsv(url: string) {
  return new Promise((resolve, reject) => {
    https
      .get(url, (response) => {
        if (response.statusCode === 200) {
          const chunks: Array<any> = [];
          response.on("data", (chunk) => chunks.push(chunk));
          response.on("end", async () => {
            const buffer = Buffer.concat(chunks);
            zlib.gunzip(buffer, async (error, decompressedData) => {
              if (error) {
                reject(error);
                return null;
              }
              const parsedData = tsvParse(decompressedData.toString("utf-8")); // Specify UTF-8 encoding
              resolve(parsedData); // Return the parsed data as an array of rows
              return parsedData;
            });
          });
        } else {
          reject(new Error(`Error downloading file: ${response.statusCode}`));
        }
      })
      .on("error", (error) => {
        reject(error);
      });
  });
}
