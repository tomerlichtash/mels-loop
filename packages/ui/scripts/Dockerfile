FROM mcr.microsoft.com/playwright:v1.58.2-noble@sha256:6446946a1d9fd62d9ae501312a2d76a43ee688542b21622056a372959b65d63d

ENV PLAYWRIGHT_BROWSERS_PATH=/ms-playwright

# Force software rendering and disable GPU acceleration for consistency
ENV WEBKIT_DISABLE_COMPOSITING_MODE=1
ENV WEBKIT_FORCE_COMPLEX_TEXT=0
ENV QT_X11_NO_MITSHM=1
ENV LIBGL_ALWAYS_SOFTWARE=1

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

# Switch to non-root user (pwuser exists in the base image)
USER pwuser

# Disable font antialiasing via fontconfig (Chromium, Firefox)
RUN mkdir -p /home/pwuser/.config/fontconfig \
    && echo '<?xml version="1.0"?>\n\
<!DOCTYPE fontconfig SYSTEM "fonts.dtd">\n\
<fontconfig>\n\
  <match target="pattern">\n\
    <edit name="antialias" mode="assign"><bool>false</bool></edit>\n\
    <edit name="hinting" mode="assign"><bool>false</bool></edit>\n\
    <edit name="hintstyle" mode="assign"><const>hintnone</const></edit>\n\
    <edit name="rgba" mode="assign"><const>none</const></edit>\n\
    <edit name="lcdfilter" mode="assign"><const>lcdnone</const></edit>\n\
  </match>\n\
  <match target="font">\n\
    <edit name="antialias" mode="assign"><bool>false</bool></edit>\n\
    <edit name="hinting" mode="assign"><bool>false</bool></edit>\n\
    <edit name="hintstyle" mode="assign"><const>hintnone</const></edit>\n\
    <edit name="rgba" mode="assign"><const>none</const></edit>\n\
    <edit name="lcdfilter" mode="assign"><const>lcdnone</const></edit>\n\
  </match>\n\
</fontconfig>' > /home/pwuser/.config/fontconfig/fonts.conf \
    && fc-cache -fv

ENTRYPOINT ["/entrypoint.sh"]
