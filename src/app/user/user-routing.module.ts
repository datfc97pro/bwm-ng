import { Routes, RouterModule } from "@angular/router";
import { NgModule } from "@angular/core";
import { UserComponent } from "./user.component";
import { AuthGuard } from "../auth/shared/auth.guard";
import { UserDetailComponent } from "./user-detail/user-detail.component";

const routes: Routes = [
  {
    path: "users",
    component: UserComponent,
    children: [
      {
        path: "profile",
        canActivate: [AuthGuard],
        component: UserDetailComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule {}
