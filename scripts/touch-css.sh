#!/usr/bin/bash
CSS_SRC=src/components/layout/layout.st.css
cp -f $CSS_SRC /tmp
echo "" >> $CSS_SRC
echo '.dummy { color: red; }' >> $CSS_SRC
sleep 2
cp -f $CSS_SRC /tmp/new.css
cp -f /tmp/layout.st.css $CSS_SRC
echo "Touched $CSS_SRC" 