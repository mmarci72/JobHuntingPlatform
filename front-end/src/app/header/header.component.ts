import { NgOptimizedImage } from "@angular/common";
import { Component } from "@angular/core";
import { MatTabLink } from "@angular/material/tabs";
import { RouterLink } from "@angular/router";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [RouterLink, NgOptimizedImage, MatTabLink],
  templateUrl: "./header.component.html",
  styleUrl: "./header.component.scss",
})
export class HeaderComponent {}
