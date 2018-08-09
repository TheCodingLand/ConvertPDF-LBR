FROM ubuntu:bionic


RUN apt-get update && apt-get install -y \ 
    build-essential \
    python3 \
    python \
    python-dev \
    libxml2-dev \
    libxslt-dev \
    libssl-dev \
    zlib1g-dev \
    libyaml-dev \
    libffi-dev \
    python-pip \
    python3-pip \ 
    wget \
    software-properties-common \
    locales

# Set the locale
RUN sed -i -e 's/# en_US.UTF-8 UTF-8/en_US.UTF-8 UTF-8/' /etc/locale.gen && \
    locale-gen
ENV LANG en_US.UTF-8  
ENV LANGUAGE en_US:en  
ENV LC_ALL en_US.UTF-8  
RUN add-apt-repository ppa:malteworld/ppa


RUN apt-get update -qq && apt-get install -y \
  ghostscript \
  libgs-dev \
  imagemagick \
  bc \
  poppler-utils \
  pdftk

COPY policy.xml /etc/ImageMagick-6/policy.xml

# set working directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# add app

COPY localthresh /usr/bin/localthresh
RUN chmod 777 /usr/bin/localthresh 

ADD requirements.txt requirements.txt
RUN pip3 install -r requirements.txt

ADD . /usr/src/app
RUN mkdir /data
CMD python3 main.py