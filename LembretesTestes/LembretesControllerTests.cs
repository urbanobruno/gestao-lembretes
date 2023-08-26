using Xunit;
using System;
using System.Collections.Generic;

using Microsoft.AspNetCore.Mvc;
using LembretesAPI.Models;
using LembretesAPI.Data;
using LembretesAPI.Controllers;

public class LembretesControllerTests
{
    [Fact]
    public void GetLembretes_DeveRetornarTodosLembretes()
    {
        // Arrange
        var lembretesFicticios = new List<Lembrete>
        {
            new Lembrete { Id = 1, Nome = "Teste 1", DataLembrete = DateTime.Now.AddDays(1) },
        };

        var mockContext = MockHelpers.CreateMockContext(lembretesFicticios);

        var controller = new LembretesController(mockContext.Object);

        // Act
        var resultadoAction = controller.GetLembretes();

        // Assert
        Assert.NotNull(resultadoAction);
        var lembretesRetornados = resultadoAction.Value;

        // Testa se todos os lembretesFicticios foram carregados
        Assert.Equal(lembretesFicticios.Count, lembretesRetornados.Count()); 

    }

    [Fact]
    public void CriaLembrete_DeveCriarNovoLembrete()
    {
        // Arrange
        var mockContext = MockHelpers.CreateMockContext(new List<Lembrete>());
        var controller = new LembretesController(mockContext.Object);
        var novoLembrete = new Lembrete { Nome = "Teste", DataLembrete = DateTime.Now.AddDays(1) };

        // Act
        var resultadoAction = controller.CriaLembrete(novoLembrete);

        // Assert
        Assert.True(resultadoAction.Result is CreatedAtActionResult);

        var objectResult = resultadoAction.Result as CreatedAtActionResult;
        var lembreteRetornado = objectResult.Value as Lembrete;

        Assert.Equal(novoLembrete.Nome, lembreteRetornado.Nome);
        Assert.Equal(1, mockContext.Object.Lembretes.Count()); // Testa se o lembrete foi adicionado
    }

    [Fact]
    public void DeleteLembrete_DeveDeletarLembrete()
    {
        // Arrange
        var lembreteExistente = new Lembrete { Id = 1, Nome = "Teste", DataLembrete = DateTime.Now.AddDays(1) };
        var mockContext = MockHelpers.CreateMockContext(new List<Lembrete> { lembreteExistente });
        var controller = new LembretesController(mockContext.Object);

        // Assert Lembrete Existe
        Assert.Single(mockContext.Object.Lembretes); // Antes da deleção
        Assert.Equal(1, mockContext.Object.Lembretes.Count()); // Testa se o lembrete foi adicionado

        // Act
        var resultadoAction = controller.DeleteLembrete(lembreteExistente.Id);

        // Assert Lembrete Deletado
        Assert.IsType<NoContentResult>(resultadoAction);
        Assert.Equal(0, mockContext.Object.Lembretes.Count()); // Testa se o lembrete foi deletado

    }

}
