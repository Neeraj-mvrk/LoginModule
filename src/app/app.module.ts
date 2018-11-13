import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule,routingComponents } from './app.routing';
import { AppComponent } from './app.component';
import { SignupFormComponent } from './signup-form/signup-form.component';
import { MaterialModule } from './material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuardService as AuthGuard } from './Services/auth-guard.service';
import { AuthService } from './Services/auth.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptor } from './Services/token.interceptor';
import { GoogleDataComponent } from './google-data/google-data.component';
@NgModule({
  declarations: [
    AppComponent,
    SignupFormComponent,
    routingComponents,
    GoogleDataComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
     ReactiveFormsModule

  ],
  providers: [AuthGuard,AuthService, {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
