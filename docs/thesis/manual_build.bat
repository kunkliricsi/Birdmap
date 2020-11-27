set DOCUMENT=thesis

pdflatex --quiet %DOCUMENT%
bibtex -quiet %DOCUMENT%
pdflatex --quiet %DOCUMENT%
pdflatex --quiet %DOCUMENT%

del /s *.aux *.dvi *.thm *.lof *.log *.lot *.fls *.out *.toc *.bbl *.blg