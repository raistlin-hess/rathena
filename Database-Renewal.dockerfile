FROM mysql:5.6

ARG MYSQL_INIT_DIR='/docker-entrypoint-initdb.d'

# Copy all scripts to director for baseimage to automatically execute at startup
COPY ./sql-files/ ${MYSQL_INIT_DIR}

# Remove non-renewal scripts
RUN rm -f ${MYSQL_INIT_DIR}/item_db.sql && \
    rm -f ${MYSQL_INIT_DIR}/item_db2.sql && \
    rm -f ${MYSQL_INIT_DIR}/mob_db.sql && \
    rm -f ${MYSQL_INIT_DIR}/mob_db2.sql && \
    rm -f ${MYSQL_INIT_DIR}/mob_skill_db.sql && \
    rm -f ${MYSQL_INIT_DIR}/mob_skill_db2.sql && \
    rm -rf ${MYSQL_INIT_DIR}/clean_databases
