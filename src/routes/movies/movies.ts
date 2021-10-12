import express from "express";
import { moviesController } from "../../controllers/movies/movies";


export const moviesRouter = express.Router();


moviesRouter.post("/add", moviesController.create);
moviesRouter.get("/", moviesController.list);
moviesRouter.get("/:id", moviesController.getMovie);
moviesRouter.get("/search?", moviesController.filter);
moviesRouter.delete("/:id", moviesController.delete);
moviesRouter.patch("/:id", moviesController.update);

