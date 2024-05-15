-- CreateTable
CREATE TABLE "Task" (
    "id" VARCHAR(255) NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "status" VARCHAR(255) NOT NULL,
    "label" VARCHAR(255),
    "priority" VARCHAR(255) NOT NULL,

    CONSTRAINT "Task_pkey" PRIMARY KEY ("id")
);
