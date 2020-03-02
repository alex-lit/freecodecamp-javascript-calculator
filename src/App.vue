<script lang="ts">
  import { Component, Vue } from 'vue-property-decorator';

  @Component<App>({})
  export default class App extends Vue {
    result: number = 0;

    expression: string = '';

    limit: number = 5;

    get expressionLength(): number {
      return this.expression.length;
    }

    get lockDashboard(): boolean {
      return this.expressionLength >= this.limit;
    }

    extendExpression(value) {
      if (this.lockDashboard) {
        this.$message({
          message: 'Digit limit met',
          type: 'warning',
        });
      } else {
        this.expression = `${this.expression}${value}`
          .replace(/\*{2,}/g, '*')
          .replace(/\/{2,}/g, '/')
          .replace(/\+{2,}/g, '+')
          .replace(/-{2,}/g, '-')
          .replace(/\.{2,}/g, '.');
      }
    }

    calcResult(): void {
      // eslint-disable-next-line no-eval
      this.result = eval(this.expression);
      this.expression = `${this.expression}=${this.result}`;
    }

    cancel() {
      this.expression = this.expression.substring(0, this.expression.length - 1);
    }

    reset() {
      this.result = 0;
      this.expression = '';
    }
  }
</script>

<template>
  <main class="app">
    <div class="app__container">
      <figure class="app__display">
        <p class="app__display-sup">{{ expression }}</p>
        <p id="display" class="app__display-result">{{ result }}</p>
      </figure>
      <nav class="app__dashboard">
        <el-button id="clear" type="danger" @click="reset">AC</el-button>
        <el-button type="danger" @click="cancel">CE</el-button>
        <el-button
          id="divide"
          :disabled="lockDashboard"
          type="warning"
          @click="extendExpression('/')"
          >/</el-button
        >
        <el-button
          id="multiply"
          :disabled="lockDashboard"
          type="warning"
          @click="extendExpression('*')"
          >x</el-button
        >
        <el-button id="seven" :disabled="lockDashboard" @click="extendExpression('7')">7</el-button>
        <el-button id="eight" :disabled="lockDashboard" @click="extendExpression('8')">8</el-button>
        <el-button id="nine" :disabled="lockDashboard" @click="extendExpression('9')">9</el-button>
        <el-button
          id="subtract"
          :disabled="lockDashboard"
          type="warning"
          @click="extendExpression('-')"
          >-</el-button
        >
        <el-button id="four" :disabled="lockDashboard" @click="extendExpression('4')">4</el-button>
        <el-button id="five" :disabled="lockDashboard" @click="extendExpression('5')">5</el-button>
        <el-button id="six" :disabled="lockDashboard" @click="extendExpression('6')">6</el-button>
        <el-button id="add" :disabled="lockDashboard" type="warning" @click="extendExpression('+')"
          >+</el-button
        >
        <el-button id="one" :disabled="lockDashboard" @click="extendExpression('1')">1</el-button>
        <el-button id="two" :disabled="lockDashboard" @click="extendExpression('2')">2</el-button>
        <el-button id="three" :disabled="lockDashboard" @click="extendExpression('3')">3</el-button>
        <el-button
          id="equals"
          :disabled="lockDashboard"
          type="primary"
          style="grid-area: equo;"
          @click="calcResult"
          >=</el-button
        >
        <el-button
          id="zero"
          :disabled="lockDashboard"
          style="grid-area: zero;"
          @click="extendExpression('0')"
          >0</el-button
        >
        <el-button id="decimal" :disabled="lockDashboard" type="info" @click="extendExpression('.')"
          >.</el-button
        >
      </nav>
    </div>
  </main>
</template>

<style lang="postcss" scoped>
  .app {
    display: flex;
    min-height: 100vh;
    align-items: center;
    justify-content: center;
    background-color: var(--gray--800);
    font-family: var(--font-family--monospace);
  }

  .app__container {
    display: grid;
    width: 320px;
    padding: 10px;
    background-color: var(--gray--900);
    border-radius: 4px;
    box-shadow: var(--box-shadow);
    grid-gap: 10px;
  }

  .app__display {
    display: grid;
    width: 100%;
    grid-gap: 10px;
    text-align: right;
  }

  .app__display-sup {
    display: block;
    width: 100%;
    height: 1em;
    color: var(--gray--200);
    font-size: 12px;
  }

  .app__display-result {
    width: 100%;
    color: var(--amber--200);
    font-size: 24px;
    font-weight: 700;
  }

  .app__dashboard {
    display: grid;
    grid-gap: 10px;
    grid-template-areas:
      'ac ce delim x'
      '7 8 9  minus'
      '4 5 6  plus'
      '1 2 3  equo'
      'zero zero dot  equo';

    & .el-button {
      margin: 0;
      user-select: none;
    }
  }
</style>
