@JS()
library callable_function;

import 'dart:html';
import 'package:js/js.dart';
import 'package:barcode/barcode.dart';
import 'package:textifier/textifier.dart';
import 'package:uuid/uuid.dart';

final uuid = Uuid();
final dm = Barcode.qrCode();
final qrCodeDiv = querySelector('#qrcode') as DivElement;
final qrCodeTextInput = querySelector('#source') as InputElement;
final textArt = querySelector('#textart') as DivElement;
final textArtInput = querySelector('#textArtText') as InputElement;
final viteLogo = querySelector("#vite") as ImageElement;
final dartLogo = querySelector("#dart") as ImageElement;
final uuidHolder = querySelector("#uuid") as SpanElement;
final uuidBtn = querySelector("#uuidBtn") as ButtonElement;

class AllowAllElements implements NodeValidator {
  @override
  bool allowsAttribute(Element element, String attributeName, String value) {
    return true;
  }

  @override
  bool allowsElement(Element element) {
    return true;
  }
}

void createQrCode(String input) {
  final qrcode = dm.toSvg(input, width: 200, height: 200);
  qrCodeDiv.setInnerHtml(qrcode, validator: AllowAllElements());
}

void createViteText(String input) async {
  final cleanInput = input.replaceAll(new RegExp(r'[^\w\s]+'), '');
  final characters =
      cleanInput.length == 0 || cleanInput.replaceAll(" ", "").length == 0
          ? "vite"
          : cleanInput;
  final icon = (querySelector("#" + characters.toLowerCase()) ?? viteLogo)
      as ImageElement;
  await new Textifier(maxWidth: 100, characters: characters, ordered: true)
      .write(icon.src, textArt);
  textArt.setInnerHtml(textArt.innerHtml.replaceAll(new RegExp(r'\s+\n'), '\n'),
      validator: AllowAllElements());
}

void createUUID() {
  uuidHolder.innerText = uuid.v4();
}

// Example function export
@JS('helloWorld')
external set _helloWorld(void Function() f);

void _printHW() {
  print('Hello from Dart!');
}

void main() {
  // You should now be able to call helloWorld()
  // from outside Dart!
  _helloWorld = allowInterop(_printHW);

  // Set initial values
  qrCodeTextInput.value = "Hello Vite!";
  textArtInput.value = "vite";

  // Run initial functions
  createQrCode(qrCodeTextInput.value);
  createViteText(textArtInput.value);
  new Textifier(maxWidth: 100, characters: 'You found me! ', ordered: true).log(
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNTEyIiBoZWlnaHQ9IjUxMiIgZmlsbD0ibm9uZSIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PGxpbmVhckdyYWRpZW50IGlkPSJhIj48c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiMwMTU3OWIiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiM0MGM0ZmYiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCBpZD0iYyIgeDE9IjE5NC42NSIgeTE9IjguODIiIHgyPSIyMzYuMDgiIHkyPSIyOTIuOTkiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiBncmFkaWVudFRyYW5zZm9ybT0icm90YXRlKDE1LjM5IDM3NC4zMyAzNDYuNjQpIHNjYWxlKDEuNDE4MzQpIj48c3RvcCBzdG9wLWNvbG9yPSIjZmZlNjY1Ii8+PHN0b3Agb2Zmc2V0PSIuMDgiIHN0b3AtY29sb3I9IiNmN2NjMDAiLz48c3RvcCBvZmZzZXQ9IjEiIHN0b3AtY29sb3I9IiNiZDdkMDAiLz48L2xpbmVhckdyYWRpZW50PjxsaW5lYXJHcmFkaWVudCB4bGluazpocmVmPSIjYSIgaWQ9ImIiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIiB4MT0iLTk3MC41NyIgeTE9IjQ3OS4yMSIgeDI9Ii0xMDY4LjI5IiB5Mj0iMTc4LjU0IiBncmFkaWVudFRyYW5zZm9ybT0idHJhbnNsYXRlKDE0NTAuNyAtMTA2LjEpIHNjYWxlKDEuMjY0MzMpIi8+PC9kZWZzPjxwYXRoIGQ9Ik0yNTcgMjBjLTI4LjcxIDkuNjQtNTEuNTUgMzIuMjUtNzcuODUgNDcuMjVsLTc5LjEzIDUyLjM3QzIwMy41IDIyMy4wOCAzMDYuOTUgMzI2LjU4IDQxMC40NyA0MzAuMDFjMjAuNDctMTAuMjYgNTUuMTUtMTAuMTIgNjYuNi0yNi45OGwuMTQtMTc2Ljk1Yy0yOS43NS0yOC40NC01Ni44MS02MC04OC40NS04Ni4yNy05Ljc5LTguMy00Ny4wMy0yOC4yMi0zMS41Ny4zNWw4MC41NCAyMjguMzVjLTI5LjEtODItNTcuNTctMTY0LjItODcuMDYtMjQ2LjA1LTEyLjE3LjgzIDcuNjItNC4zNC00LjYtMTMuNDktNi45My0zMS40NC0zOC4xLTQ3LjY0LTU3LjY4LTcwLjg5LTktOC4yMS0xOC4zLTE3LjgxLTMxLjQtMTguMDhabS0xNTYuOTggOTkuNjRjLTMyLjY3IDQ5LjI4LTY1LjIzIDk4LjY0LTk3Ljk3IDE0Ny44OS03LjIxIDI3LjQ3IDIyLjEgNDMuNjQgMzcuMzMgNjEuNDkgMTUuNyAxNi45IDMxLjMyIDM0Ljg2IDU1LjM4IDM4LjY4IDQuNTQgMS40NyAxMS45NCA1Ljg4IDUuOTUtMi4yIDcuNzQgMTEuNzkgMjIuOCAxMC41OSAzNC40NCAxNi40M2wyMTMuNzkgNzUuMzktMjQ1LjgtODYuNjdjOS44NCA0NC4xMyA0OS43NCA2OS45IDc4LjU2IDEwMS4zMyAxMy42MyAxMC4wNiAyMi4yNyAzMi4xNyA0MS44NyAyNy44bDE2NC40My4yYzIuNTItMjUuMTMgMjIuNDctNjkuOTcgMjIuNDctNjkuOTctMTAxLjA0LTEwMS4wNC0yMDkuNC0yMDkuMzQtMzEwLjQ1LTMxMC4zN1oiIGZpbGw9InVybCgjYikiIHN0cm9rZT0idXJsKCNiKSIgc3Ryb2tlLXdpZHRoPSIxLjg4Ii8+PHBhdGggZD0iTTUwNS40MyAyNS41MSAzMDkuMiAxMC43NWE3LjEgNy4xIDAgMCAwLTcuMjUgNC43OWwtNjQuNyAxOTAuM2E3LjEgNy4xIDAgMCAwIDYuNDIgOS4zN2w1NS4xNCAyLjNhNy4xIDcuMSAwIDAgMSA2LjAyIDEwLjNsLTM2LjE1IDcxLjE4YTcuMSA3LjEgMCAwIDAgNi41IDEwLjNsMzQuNy0uOTFhNy4xIDcuMSAwIDAgMSA2LjUgMTAuMzFMMjU5LjMgNDMwLjQzYy0zLjU3IDYuOTkgNS4xOCAxMy43NCAxMS4wNCA4LjUybDMuOTEtMy40OUw1MDkuMyAxNzQuNDFhNy4xIDcuMSAwIDAgMC00LjcyLTExLjgxbC01Ni4yLTQuMzlhNy4xIDcuMSAwIDAgMS01LjQ5LTEwLjc3bDY4LjA2LTExMS4xNmE3LjEgNy4xIDAgMCAwLTUuNTItMTAuNzd6IiBmaWxsPSJ1cmwoI2MpIi8+PC9zdmc+");
  createUUID();

  // Bind events
  textArtInput.onInput.listen((event) => createViteText(textArtInput.value));
  qrCodeTextInput.onInput
      .listen((event) => createQrCode(qrCodeTextInput.value));
  uuidBtn.onClick.listen((event) => createUUID());
}
