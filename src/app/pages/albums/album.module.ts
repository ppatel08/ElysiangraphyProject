import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SharedModule } from "src/app/shared/shared.module";
import { AlbumRoutingModule } from "./album-routing.module";
import { AlbumsSaveComponent } from "./albums-save/albums-save.component";
import { AlbumsComponent } from "./albums/albums.component";
import { AlbumsViewComponent } from './albums-view/albums-view.component';
import { UploadFilesComponent } from './upload-files/upload-files.component';


@NgModule({
    declarations: [
        AlbumsComponent,
        AlbumsSaveComponent,
        AlbumsViewComponent,
        UploadFilesComponent
    ],
    imports: [
        CommonModule,
        AlbumRoutingModule,
        SharedModule
    ]
})
export class AlbumsModule { }