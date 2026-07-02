# Before/After Scroll Comparison

The two pages share the same content and visual idea so the implementation architecture is the meaningful difference.

## Run

```powershell
cd examples/scroll-comparison
py -m http.server 8080
```

Open:

```text
http://localhost:8080/before-laggy/
http://localhost:8080/after-fixed/
```

## Fair recording procedure

Use the same browser, viewport, input method, CPU throttling, and scroll sequence for both pages. Do not add artificial video stutter. The before page performs real avoidable layout, DOM, and paint work. The after page changes state when the next left-side control reaches the sticky top line.
