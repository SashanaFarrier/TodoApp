﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using TodoApp.Data;

#nullable disable

namespace TodoApp.Migrations
{
    [DbContext(typeof(TodoDBContext))]
    [Migration("20240418111718_AddedPriorityDBSet")]
    partial class AddedPriorityDBSet
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("TodoApp.Models.Priority", b =>
                {
                    b.Property<int>("PriorityID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("PriorityID"));

                    b.Property<int>("Level")
                        .HasColumnType("int");

                    b.HasKey("PriorityID");

                    b.ToTable("Priorities");
                });

            modelBuilder.Entity("TodoApp.Models.Todo", b =>
                {
                    b.Property<int>("TodoID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("TodoID"));

                    b.Property<DateTime>("CompletedOn")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("CreatedOn")
                        .HasColumnType("datetime2");

                    b.Property<string>("Description")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Details")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("DueOn")
                        .HasColumnType("datetime2");

                    b.Property<int?>("PriorityID")
                        .HasColumnType("int");

                    b.HasKey("TodoID");

                    b.HasIndex("PriorityID");

                    b.ToTable("Todos");
                });

            modelBuilder.Entity("TodoApp.Models.Todo", b =>
                {
                    b.HasOne("TodoApp.Models.Priority", "Priority")
                        .WithMany("Todos")
                        .HasForeignKey("PriorityID");

                    b.Navigation("Priority");
                });

            modelBuilder.Entity("TodoApp.Models.Priority", b =>
                {
                    b.Navigation("Todos");
                });
#pragma warning restore 612, 618
        }
    }
}
