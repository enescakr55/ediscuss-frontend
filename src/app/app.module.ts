import { SystemInterceptor } from './interceptors/system.interceptor';
import { NgModule, SecurityContext } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NaviComponent } from './components/navi/navi.component';
import { FooterComponent } from './components/footer/footer.component';
import { IntroductionComponent } from './components/introduction/introduction.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SubjectSelectorComponent } from './components/subject-selector/subject-selector.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { MainComponent } from './components/main/main.component';
import { DiscussionsComponent } from './components/discussions/discussions.component';
import { DiscussComponent } from './components/discussions/discuss/discuss.component';
import { RepliesComponent } from './components/replies/replies.component';
import { ReplyComponent } from './components/replies/reply/reply.component';
import { AddDiscussionComponent } from './components/add-discussion/add-discussion.component';
import { AddReplyComponent } from './components/add-reply/add-reply.component';
import { SubjectFilterComponent } from './components/subject-filter/subject-filter.component';
import { LoadingComponent } from './components/helpers/loading/loading.component';
import { SanitizedHtmlPipe } from './pipes/sanitized-html.pipe';
import { MarkdownModule, MarkedOptions } from 'ngx-markdown';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AccountSettingsComponent } from './components/settings/accountSettings/account-settings/account-settings.component';
import { PreferencesComponent } from './components/settings/preferences/preferences.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TrywebComponent } from './components/tryweb/tryweb.component';

export function HttpLoaderFactory(httpClient:HttpClient){
  return new TranslateHttpLoader(httpClient);
}
@NgModule({
  declarations: [
    AppComponent,
    NaviComponent,
    FooterComponent,
    IntroductionComponent,
    LoginComponent,
    RegisterComponent,
    SubjectSelectorComponent,
    MainComponent,
    DiscussionsComponent,
    DiscussComponent,
    RepliesComponent,
    ReplyComponent,
    AddDiscussionComponent,
    AddReplyComponent,
    SubjectFilterComponent,
    LoadingComponent,
    SanitizedHtmlPipe,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    SettingsComponent,
    AccountSettingsComponent,
    PreferencesComponent,
    NotificationsComponent,
    TrywebComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    TranslateModule.forRoot({
      loader:{
        provide:TranslateLoader,
        useFactory:HttpLoaderFactory,
        deps:[HttpClient]
      },
      defaultLanguage:"tr"
    }),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
    }),
    MarkdownModule.forRoot({
      loader: HttpClient, // optional, only if you use [src] attribute
      markedOptions: {

        provide: MarkedOptions,
        useValue: {
          gfm:false,
          breaks: false,
          pedantic: false,
          smartLists: true,
          smartypants: false,
          xhtml:false,
          sanitize:true
        },
      },

    }),
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:SystemInterceptor,multi:true}
  ],
  bootstrap: [AppComponent]

})
export class AppModule { }
