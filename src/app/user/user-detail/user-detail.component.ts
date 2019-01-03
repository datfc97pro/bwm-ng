import { Component, OnInit } from "@angular/core";
import { UserService } from "../shared/user.service";
import { AuthService } from "src/app/auth/shared/auth.service";
import { ImageUploadService } from "src/app/common/components/image-upload/image-upload.service";
import { ToastrService } from "ngx-toastr";

class FileSnippet {
  // static readonly IMAGE_SIZE = { width: 950, height: 720 };

  // pending: boolean = false;
  // status: string = "INIT";

  constructor(public src: string, public file: File) {}
}

@Component({
  selector: "app-user-detail",
  templateUrl: "./user-detail.component.html",
  styleUrls: ["./user-detail.component.scss"]
})
export class UserDetailComponent implements OnInit {
  isActiveInput: boolean = false;
  user: any;
  selectedFile: FileSnippet;
  newUser;

  constructor(
    private userService: UserService,
    private auth: AuthService,
    private imageService: ImageUploadService,
    private toastr: ToastrService
  ) {}

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    const userId = this.auth.getUserId();

    this.userService.getUser(userId).subscribe(
      user => {
        this.user = user;
      },
      err => {}
    );
  }

  processFile(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();

    // reader.addEventListener("load", (event: any) => {
    //   this.user.avatar = event.target.result;
    // });

    this.imageService.uploadImage(file).subscribe(imageUrl => {
      this.userService.updateUser({ avatar: imageUrl }).subscribe(userData => {
        this.user.avatar = imageUrl;
        this.toastr.success("Update image successfully!", "Success!", {
          timeOut: 1500,
          progressBar: true,
          closeButton: true,
          tapToDismiss: true
        });
      });
    });

    reader.readAsDataURL(file);
  }

  update(form: any) {
    this.userService.updateUser(this.user).subscribe(userData => {
      this.isActiveInput = false;
      this.user = userData;
      this.toastr.success("Update successfully!", "Success!", {
        timeOut: 1500,
        progressBar: true,
        closeButton: true,
        tapToDismiss: true
      });
    });
  }
}
