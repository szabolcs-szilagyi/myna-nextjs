import "reflect-metadata";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app/app.module";
import * as http from "http";
import { NextApiHandler } from "next";
import { INestApplication } from "@nestjs/common";

export class Backend {

  static app: Promise<INestApplication>;

  constructor() {
    if (Backend.app) return;
    console.log('################ App not initialized yet! ###########');

    Backend.app = NestFactory.create(
      AppModule,
      { bodyParser: false }
    )
      .then((appInstance) => {
        appInstance.setGlobalPrefix("api");
        return appInstance.init().then(() => appInstance);
      });
  }

  async getListener() {
    const app = await Backend.app;
    const server: http.Server = app.getHttpServer();
    const [ listener ] = server.listeners("request") as NextApiHandler[];
    return listener;
  }
}
