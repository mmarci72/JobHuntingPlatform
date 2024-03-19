import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "salary",
  standalone: true,
})
export class SalaryPipe implements PipeTransform {
  transform(input: number, args: number = 1): string | null {
    const suffixes = ["k", "M"];

    if (input < 1000) {
      return input.toString();
    }

    const exp = Math.floor(Math.log(input) / Math.log(1000));

    return (input / Math.pow(1000, exp)).toFixed(args) + suffixes[exp - 1];
  }
}
