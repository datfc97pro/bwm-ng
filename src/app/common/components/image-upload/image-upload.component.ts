import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { ImageUploadService } from "./image-upload.service";
import { ToastrService } from "ngx-toastr";
import { HttpErrorResponse } from "@angular/common/http";

class FileSnippet {
  static readonly IMAGE_SIZE = { width: 950, height: 720 };

  pending: boolean = false;
  status: string = "INIT";

  constructor(public src: string, public file: File) {}
}

@Component({
  selector: "app-image-upload",
  templateUrl: "./image-upload.component.html",
  styleUrls: ["./image-upload.component.scss"]
})
export class ImageUploadComponent implements OnInit {
  @Output() imageUploaded = new EventEmitter();
  @Output() imageError = new EventEmitter();
  @Output() imageLoadedToContainer = new EventEmitter();
  @Output() croppingCanceled = new EventEmitter();

  selectedFile: FileSnippet;
  imageChangedEvent: any;

  constructor(
    private imageService: ImageUploadService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {}

  private onSuccess(imageUrl: string) {
    this.selectedFile.pending = false;
    // this.selectedFile.status = "OK";
    this.toastr.success("🦄 Upload Success!", "Success", {
      timeOut: 2000,
      progressBar: true,
      closeButton: true,
      tapToDismiss: true
    });
    this.imageChangedEvent = null;
    this.imageUploaded.emit(imageUrl);
  }

  private onFailure(errorResponse) {
    this.selectedFile.pending = false;
    // this.selectedFile.status = "FAIL";
    this.toastr.error(`🦄 ${errorResponse.error.errors[0].detail}`, "Error", {
      timeOut: 2000,
      progressBar: true,
      closeButton: true,
      tapToDismiss: true
    });
    this.imageChangedEvent = null;
    this.imageError.emit("");
  }

  imageCropped(file: File): FileSnippet | File {
    if (this.selectedFile) {
      return (this.selectedFile.file = file);
    }

    return (this.selectedFile = new FileSnippet("", file));
  }

  imageLoaded() {
    this.imageLoadedToContainer.emit();
  }

  cancelCropping() {
    this.imageChangedEvent = null;
    this.croppingCanceled.emit();
  }

  processFile(event: any) {
    this.selectedFile = undefined;

    const URL = window.URL;
    let file, img;

    if (
      (file = event.target.files[0]) &&
      (file.type === "image/png" ||
        file.type === "image/jpeg" ||
        file.type === "image/jpg")
    ) {
      img = new Image();

      const self = this;
      img.onload = function() {
        if (
          this.width > FileSnippet.IMAGE_SIZE.width &&
          this.height > FileSnippet.IMAGE_SIZE.height
        ) {
          self.imageChangedEvent = event;
        } else {
          self.toastr.error(
            `🦄 Minimum width is ${
              FileSnippet.IMAGE_SIZE.width
            } and minimum heigth is ${FileSnippet.IMAGE_SIZE.height}`,
            "Error!",
            {
              timeOut: 2000,
              progressBar: true,
              closeButton: true,
              tapToDismiss: true
            }
          );
        }
      };

      img.src = URL.createObjectURL(file);
    } else {
      this.toastr.error(
        "🦄 Unsupported File Type. Only jpeg, png and jpg is allowed!",
        "Error!",
        {
          timeOut: 2000,
          progressBar: true,
          closeButton: true,
          tapToDismiss: true
        }
      );
    }
  }

  uploadImage() {
    if (this.selectedFile) {
      const reader = new FileReader();

      reader.addEventListener("load", (event: any) => {
        this.selectedFile.src = event.target.result;

        this.selectedFile.pending = true;
        this.imageService.uploadImage(this.selectedFile.file).subscribe(
          (imageUrl: string) => {
            this.onSuccess(imageUrl);
          },
          (errorResponse: HttpErrorResponse) => {
            this.onFailure(errorResponse);
          }
        );
      });

      reader.readAsDataURL(this.selectedFile.file);
    }
  }
}
