import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import * as http from "http";
import { NextApiHandler } from "next";
import { INestApplication } from "@nestjs/common";

export module Backend {

  let app: INestApplication;
  let appPromise: Promise<void>;

  export async function getApp() {
    if (app) {
      return app;
    }
    console.log('################ App not initialized yet! ###########');

    if (!appPromise) {
      appPromise = new Promise(async (resolve) => {
        const appInCreation = await NestFactory.create(AppModule, {
          bodyParser: false,
        });
        appInCreation.setGlobalPrefix("api");

        await appInCreation.init();
        app = appInCreation;
        resolve();
      });
    }

    await appPromise;
    return app;
  }

  export async function getListener() {
    const app = await getApp();
    const server: http.Server = app.getHttpServer();
    const [ listener ] = server.listeners("request") as NextApiHandler[];
    return listener;
  }
}
