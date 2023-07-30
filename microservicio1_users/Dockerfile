FROM python:3.10.0
RUN mkdir /persistencia
WORKDIR /microservicio1_users
COPY requirements.txt ./
RUN pip install -r requirements.txt
COPY . .
EXPOSE 5000
CMD [ "flask", "run","--host","0.0.0.0","--port","5000"]