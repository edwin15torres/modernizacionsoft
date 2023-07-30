FROM python:3.10.0
RUN mkdir /persistencia
WORKDIR /microservicio3_songs
COPY requirements.txt ./
RUN pip install -r requirements.txt
COPY . .
EXPOSE 5001
CMD [ "flask", "run","--host","0.0.0.0","--port","5001"]