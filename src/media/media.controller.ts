import {
  Controller,
  Param,
  Post,
  UploadedFiles,
  UseInterceptors,
} from "@nestjs/common";
import { diskStorage } from "multer";
import { FileFieldsInterceptor } from "@nestjs/platform-express";
import MediaParams from "./media.params";
import * as path from "path";
import { existsSync } from "fs";
import { mkdir } from "fs/promises";

const SCREENSHOT_FOLDER_NAME = "screenshots";

@Controller("media")
export class MediaController {
  @Post("/:gameId")
  @UseInterceptors(
    FileFieldsInterceptor(
      [
        {
          name: "logo",
          maxCount: 1,
        },
        {
          name: "trailer",
          maxCount: 1,
        },
        {
          name: "screenshots",
          maxCount: 4,
        },
      ],
      {
        storage: diskStorage({
          destination: async (req, file, cb) => {
            const gameId = req.params.gameId;
            const isScreenShot = file.fieldname === SCREENSHOT_FOLDER_NAME;
            if (!existsSync(`./media/${gameId}`)) {
              await mkdir(`./media/${gameId}`);
            }
            if (isScreenShot && !existsSync(`./media/${gameId}/screenshots`)) {
              await mkdir(`./media/${gameId}/screenshots`);
            }
            const dest =
              `./media/${gameId}` + (isScreenShot ? "/screenshots" : "");
            cb(null, dest);
          },
          filename: (req, file, cb) => {
            const filename =
              file.fieldname === SCREENSHOT_FOLDER_NAME
                ? // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                  // @ts-ignore
                  file.fieldname + req.files.screenshots.length
                : file.fieldname;
            const extension: string = path.parse(file.originalname).ext;
            cb(null, `${filename}${extension}`);
          },
        }),
      },
    ),
  )
  async uploadGameMedia(
    @Param() { gameId }: MediaParams,
    @UploadedFiles() files,
  ) {
    console.log(gameId);
    console.log(files);
  }
}
