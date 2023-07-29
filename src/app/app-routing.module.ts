import { NotificationsComponent } from './components/notifications/notifications.component';
import { SettingsComponent } from './components/settings/settings.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { IntroductionComponent } from './components/introduction/introduction.component';
import { LoggedGuard } from './guards/logged.guard';
import { AddDiscussionComponent } from './components/add-discussion/add-discussion.component';
import { RepliesComponent } from './components/replies/replies.component';
import { DiscussionsComponent } from './components/discussions/discussions.component';
import { MainComponent } from './components/main/main.component';
import { RegisterComponent } from './components/register/register.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SubjectSelectorComponent } from './components/subject-selector/subject-selector.component';
import { NotloggedGuard } from './guards/notlogged.guard';
import { TrywebComponent } from './components/tryweb/tryweb.component';

const routes: Routes = [
  {path:'',component:MainComponent,pathMatch:'full',canActivate:[LoggedGuard]},
  {path:'discussions',pathMatch:'full',component:MainComponent,canActivate:[LoggedGuard]},
  {path:'discussions/my',pathMatch:'full',component:MainComponent,canActivate:[LoggedGuard]},
  {path:'discussions/all',pathMatch:'full',component:MainComponent,canActivate:[LoggedGuard]},
  {path:'discussions/advancedFilter',pathMatch:'full',component:MainComponent,canActivate:[LoggedGuard]},
  {path:'discussions/interesting',pathMatch:'full',component:MainComponent,canActivate:[LoggedGuard]},
  {path:'discussions/filter/:type/:val',pathMatch:'full',component:MainComponent,canActivate:[LoggedGuard]},
  {path:'discussions/user/:username',pathMatch:'full',component:MainComponent,canActivate:[LoggedGuard]},
  {path:'login',component:LoginComponent,pathMatch:'full',canActivate:[NotloggedGuard]},
  {path:'register',component:RegisterComponent,pathMatch:'full',canActivate:[NotloggedGuard]},
  {path:'subjectselector',component:SubjectSelectorComponent,pathMatch:'full'},
  {path:'replies/:id',component:RepliesComponent,pathMatch:'full'},
  {path:'new-discuss',component:AddDiscussionComponent,pathMatch:'full'},
  {path:'introduction',component:IntroductionComponent,pathMatch:'full'},
  {path:'forgot-password',component:ForgotPasswordComponent,pathMatch:'full'},
  {path:'password-reset/:code',component:ResetPasswordComponent,pathMatch:'full'},
  {path:'settings/:key',component:SettingsComponent,pathMatch:'full'},
  {path:'notifications',component:NotificationsComponent,pathMatch:'full'},
  {path:'tryweb',component:TrywebComponent,pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
